"use client";

import { useEffect, useState } from "react";
import styles from "./ServiceIntroduction.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function ServiceIntroduction(intro: any) {
  const { language, translate } = useLanguage();

  const originalIntro = intro.intro;
  const [translatedIntro, setTranslatedIntro] =
    useState(originalIntro);

  /* ---------- TRANSLATION ---------- */

  useEffect(() => {
    async function translateIntro() {
      // English → no translation
      if (language.toUpperCase() === "EN") {
        setTranslatedIntro(originalIntro);
        return;
      }

      const translated = JSON.parse(
        JSON.stringify(originalIntro)
      );

      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Title
      if (translated.title) {
        tasks.push(
          t(translated.title).then(
            (r) => (translated.title = r)
          )
        );
      }

      // Description (HTML)
      if (translated.description) {
        tasks.push(
          t(translated.description).then(
            (r) => (translated.description = r)
          )
        );
      }

      await Promise.all(tasks);
      setTranslatedIntro(translated);
    }

    translateIntro();
  }, [language, originalIntro]);

  if (!translatedIntro) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h2 className={styles.title}>
              {translatedIntro.title}
            </h2>
          </div>

          <div className="col-lg-6">
            <div className={styles.descriptionCard}>
              <div className={styles.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: translatedIntro.description,
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
