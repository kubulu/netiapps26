"use client";

import { useEffect, useState } from "react";
import styles from "./SingleText.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

interface RightItem {
  items: string;
}

interface SingleTextItem {
  left_content: string;
  right_content: RightItem[];
}

interface SingleTextProps {
  data?: SingleTextItem[];
}

export default function SingleText({ data }: SingleTextProps) {
  const { language, translate } = useLanguage();
  const [translatedData, setTranslatedData] =
    useState<SingleTextItem[] | undefined>(data);

  useEffect(() => {
    async function translateData() {
      if (!data || language.toUpperCase() === "EN") {
        setTranslatedData(data);
        return;
      }

      const clonedData: SingleTextItem[] = JSON.parse(
        JSON.stringify(data)
      );

      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      clonedData.forEach((item, i) => {
        // Translate left HTML content
        if (item.left_content) {
          tasks.push(
            t(item.left_content).then(
              (res) => (clonedData[i].left_content = res)
            )
          );
        }

        // Translate right list items
        if (Array.isArray(item.right_content)) {
          item.right_content.forEach((right, j) => {
            if (right.items) {
              tasks.push(
                t(right.items).then(
                  (res) =>
                    (clonedData[i].right_content[j].items = res)
                )
              );
            }
          });
        }
      });

      await Promise.all(tasks);
      setTranslatedData(clonedData);
    }

    translateData();
  }, [language, data]);

  if (!translatedData) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {translatedData.map((element, index) => (
          <div className="row g-5" key={index}>
            <div className="col-lg-6">
              <div className={styles.leftContent}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: element.left_content,
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={styles.rightContent}>
                <ul className={styles.itemList}>
                  {element.right_content.map((item, idx) => (
                    <li key={idx} className={styles.item}>
                      {item.items}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
