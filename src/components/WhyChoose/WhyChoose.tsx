"use client";

import { useEffect, useState } from "react";
import styles from "./WhyChoose.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";
import { getMediaUrl } from "@/lib/media";

export default function WhyChoose(data: any) {
  const { language, translate } = useLanguage();
  const [translatedData, setTranslatedData] = useState<any>(data);

  useEffect(() => {
    async function translateData() {
      if (!data || language.toUpperCase() === "EN") {
        setTranslatedData(data);
        return;
      }

      const clonedData = JSON.parse(JSON.stringify(data));
      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Translate title
      if (clonedData.data?.title) {
        tasks.push(
          t(clonedData.data.title).then(
            (res) => (clonedData.data.title = res)
          )
        );
      }

      // Translate list items
      if (Array.isArray(clonedData.data?.list)) {
        clonedData.data.list.forEach((point: any, index: number) => {
          if (point.items) {
            tasks.push(
              t(point.items).then(
                (res) =>
                  (clonedData.data.list[index].items = res)
              )
            );
          }
        });
      }

      await Promise.all(tasks);
      setTranslatedData(clonedData);
    }

    translateData();
  }, [language, data]);

  if (!translatedData) return null;

  return (
    <section
      className={styles.section}
      style={{ backgroundImage: `url('${getMediaUrl("/images/whychoose.png")}')` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-8">
            <div className={styles.content}>
              <h2 className={styles.title}>
                {translatedData.data.title}
              </h2>
              <ul className={styles.list}>
                {translatedData.data.list.map(
                  (point: any, index: number) => (
                    <li key={index} className={styles.listItem}>
                      {point.items}
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
