"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CareerDetail.module.scss";
import CareerApplyForm from "../../components/CareerApplyForm/CareerApplyForm";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function CareerDetail({ acf }: any) {
  const { language, translate } = useLanguage();
  const [data, setData] = useState<any>(acf);

  useEffect(() => {
    async function translateData() {
      if (!acf || language.toUpperCase() === "EN") {
        setData(acf);
        return;
      }

      const cloned = JSON.parse(JSON.stringify(acf));
      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Titles & labels
      if (cloned.title)
        tasks.push(t(cloned.title).then(res => cloned.title = res));

      if (cloned.position)
        tasks.push(t(cloned.position).then(res => cloned.position = res));

      if (cloned.qualification)
        tasks.push(t(cloned.qualification).then(res => cloned.qualification = res));

      if (cloned.experience)
        tasks.push(t(cloned.experience).then(res => cloned.experience = res));

      if (cloned.summary)
        tasks.push(t(cloned.summary).then(res => cloned.summary = res));

      if (cloned.responsibilities)
        tasks.push(
          t(cloned.responsibilities).then(
            res => cloned.responsibilities = res
          )
        );

      await Promise.all(tasks);
      setData(cloned);
    }

    translateData();
  }, [language, acf]);

  if (!data) return null;

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Link href="/careers" className={styles.backButton}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className={styles.title}>{data.title}</h1>
            </div>

            <div className={styles.headerRight}>
              <h2 className={styles.jobDescriptionTitle}>
                Job Description
              </h2>
              <div className={styles.jobInfo}>
                <p>
                  <strong>Position:</strong> {data.position}
                </p>
                <p>
                  <strong>Qualification:</strong> {data.qualification}
                </p>
                <p>
                  <strong>Experience required:</strong> {data.experience}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.jobDetails}>
              <div className={styles.detailsCard}>
                <h3 className={styles.detailsTitle}>
                  JD: {data.position}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.responsibilities,
                  }}
                />
                <p className={styles.summary}>{data.summary}</p>
              </div>
            </div>

            <div className={styles.applicationForm}>
              <CareerApplyForm role={data.position} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
