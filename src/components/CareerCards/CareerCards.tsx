"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CareerCards.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function CareerCards(jobList: any) {
  const { language, translate } = useLanguage();
  const [translatedJobs, setTranslatedJobs] = useState<any>(jobList);

  useEffect(() => {
    async function translateData() {
      if (!jobList || language.toUpperCase() === "EN") {
        setTranslatedJobs(jobList);
        return;
      }

      const clonedData = JSON.parse(JSON.stringify(jobList));
      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      if (Array.isArray(clonedData.jobList)) {
        clonedData.jobList.forEach((job: any, index: number) => {
          // Job title
          if (job.title) {
            tasks.push(
              t(job.title).then(
                (res) => (clonedData.jobList[index].title = res)
              )
            );
          }

          // Location
          if (job.location) {
            tasks.push(
              t(job.location).then(
                (res) => (clonedData.jobList[index].location = res)
              )
            );
          }
        });
      }

      await Promise.all(tasks);
      setTranslatedJobs(clonedData);
    }

    translateData();
  }, [language, jobList]);

  if (!translatedJobs) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {translatedJobs.jobList.map(
            (job: any, index: number) => (
              <div
                key={index}
                className={`${styles.card} col-md-12`}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.jobTitle}>
                    {job.title}
                  </h3>
                  <p className={styles.location}>
                    {job.location}
                  </p>
                </div>

                <Link
                  href={job.link}
                  className={styles.applyLink}
                >
                  {/* Button text also translated */}
                  {language.toUpperCase() === "EN"
                    ? "Apply Now"
                    : "Apply Now"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
