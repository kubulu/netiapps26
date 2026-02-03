"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./CareerApplyForm.module.scss";
import { ApiService } from "../../services/api.service";


const SITE_KEY = "6LcoXl8sAAAAAHvVR6_sWc0eiX20fMpBJuOnrgNh"; // test key

export default function CareerApplyForm({ role }: { role: string }) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const baseUrl = new ApiService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!captchaToken) {
      setError("Please verify that you are not a robot");
      return;
    }

    const form = e.currentTarget;
    const fileInput = form.resume as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError("Resume is required");
      return;
    }

    const formData = new FormData(form);
    formData.append("role", role);
    formData.append("recaptcha_token", captchaToken);

    setLoading(true);

    try {
      const res = await fetch(
        baseUrl.getBaseUrl() + '/wp-json/career-form/v1/submit',
        // "http://localhost/netiapps2026/wp-netiapps/wp-json/career-form/v1/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // backend didn’t return JSON but request may still be OK
      }

      if (!res.ok) {
        setError(data.message || "Submission failed");
        return;
      }

      setSuccess("Application submitted successfully 🎉");
      form.reset();
      setCaptchaToken(null);
      setFileName("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  
  const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Full Name*</label>
        <input type="text" id="fullName" name="fullName" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone Number*</label>
        <input type="tel" id="phone" name="phone" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="city">City*</label>
        <input type="text" id="city" name="city" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="resume" className={styles.fileLabel}>
          Choose File
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          className={styles.fileInput}
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
          
            if (!file) return;
          
            const extension = file.name.split(".").pop()?.toLowerCase();
          
            if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
              setError("Only PDF or DOC/DOCX files are allowed");
              e.target.value = "";
              setFileName("");
              return;
            }
          
            if (!ALLOWED_TYPES.includes(file.type)) {
              setError("Invalid file type");
              e.target.value = "";
              setFileName("");
              return;
            }
          
            if (file.size > MAX_FILE_SIZE) {
              setError("File size must be less than 2MB");
              e.target.value = "";
              setFileName("");
              return;
            }
          
            setError("");
            setFileName(file.name);
          }}
          
        />
        <p className={styles.fileHint}>Please upload a PDF or DOC file</p>

        {fileName && (
          <p className={styles.fileSelected}>
            Selected file: <strong>{fileName}</strong>
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>
    </form>
  );
}
