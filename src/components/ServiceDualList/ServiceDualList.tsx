"use client";

import { useEffect, useState } from "react";
import styles from "./ServiceDualList.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function ServiceDualList(data: any) {
  const { language, translate } = useLanguage();

  const originalData = data.data;
  const [translatedData, setTranslatedData] =
    useState(originalData);

  /* ---------- TRANSLATION ---------- */

  useEffect(() => {
    async function translateData() {
      // English → no translation
      if (language.toUpperCase() === "EN") {
        setTranslatedData(originalData);
        return;
      }

      const translated = JSON.parse(
        JSON.stringify(originalData)
      );

      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Main title
      if (translated.title) {
        tasks.push(
          t(translated.title).then(
            (r) => (translated.title = r)
          )
        );
      }

      // Left section
      if (translated.left_section?.title) {
        tasks.push(
          t(translated.left_section.title).then(
            (r) => (translated.left_section.title = r)
          )
        );
      }

      if (translated.left_section?.description) {
        tasks.push(
          t(translated.left_section.description).then(
            (r) => (translated.left_section.description = r)
          )
        );
      }

      if (translated.left_section?.items) {
        translated.left_section.items.forEach(
          (item: any, i: number) => {
            if (item.name) {
              tasks.push(
                t(item.name).then(
                  (r) =>
                    (translated.left_section.items[i].name = r)
                )
              );
            }
          }
        );
      }

      // Right section
      if (translated.right_section?.title) {
        tasks.push(
          t(translated.right_section.title).then(
            (r) => (translated.right_section.title = r)
          )
        );
      }

      if (translated.right_section?.description) {
        tasks.push(
          t(translated.right_section.description).then(
            (r) =>
              (translated.right_section.description = r)
          )
        );
      }

      if (translated.right_section?.items) {
        translated.right_section.items.forEach(
          (item: any, i: number) => {
            if (item.name) {
              tasks.push(
                t(item.name).then(
                  (r) =>
                    (translated.right_section.items[i].name = r)
                )
              );
            }
          }
        );
      }

      await Promise.all(tasks);
      setTranslatedData(translated);
    }

    translateData();
  }, [language, originalData]);

  if (!translatedData) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.mainTitle}>
          {translatedData.title}
        </h2>

        <div className="row g-5">
          {/* Left Column */}
          <div className="col-lg-6">
            <div className={styles.column}>
              <h3 className={styles.colTitle}>
                {translatedData.left_section.title}
              </h3>

              <p className={styles.colDesc}>
                {translatedData.left_section.description}
              </p>

              <ul className={styles.itemList}>
                {translatedData.left_section.items.map(
                  (item: any, index: number) => (
                    <li key={index} className={styles.item}>
                      {item.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6">
            <div className={styles.column}>
              <h3 className={styles.colTitle}>
                {translatedData.right_section.title}
              </h3>

              <p className={styles.colDesc}>
                {translatedData.right_section.description}
              </p>

              <ul className={styles.itemList}>
                {translatedData.right_section.items.map(
                  (item: any, index: number) => (
                    <li key={index} className={styles.item}>
                      {item.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
