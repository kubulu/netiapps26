"use client";

import { useEffect, useState } from "react";
import styles from "./WhatWeDo.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function WhatWeDo(content: any) {
  const { language, translate } = useLanguage();

  const originalContent = content.content;
  const [translatedContent, setTranslatedContent] =
    useState(originalContent);

  /* ---------- TRANSLATION ---------- */

  useEffect(() => {
    async function translateContent() {
      // EN → no translation
      if (language.toUpperCase() === "EN") {
        setTranslatedContent(originalContent);
        return;
      }

      const translated = JSON.parse(
        JSON.stringify(originalContent)
      );

      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Title
      if (translated.title) {
        tasks.push(
          t(translated.title).then((r) => (translated.title = r))
        );
      }

      // Left content (HTML)
      if (translated.left) {
        tasks.push(
          t(translated.left).then((r) => (translated.left = r))
        );
      }

      // Right content (HTML)
      if (translated.right) {
        tasks.push(
          t(translated.right).then((r) => (translated.right = r))
        );
      }

      await Promise.all(tasks);
      setTranslatedContent(translated);
    }

    translateContent();
  }, [language, originalContent]);

  if (!translatedContent) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>
          {translatedContent.title}
        </h2>

        <div className={styles.card}>
          <div className="row g-0">
            <div className="col-md-6">
              <div className={styles.contentItem}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: translatedContent.left,
                  }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div
                className={`${styles.contentItem} ${styles.borderLeft}`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: translatedContent.right,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
