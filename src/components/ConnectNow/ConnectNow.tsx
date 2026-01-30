"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ConnectNow.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function ConnectNow(connect: any) {
  const { language, translate } = useLanguage();

  const originalConnect = connect.connect;
  const [translatedConnect, setTranslatedConnect] =
    useState(originalConnect);

  /* ---------- TRANSLATION ---------- */

  useEffect(() => {
    async function translateConnect() {
      // EN → no translation
      if (language.toUpperCase() === "EN") {
        setTranslatedConnect(originalConnect);
        return;
      }

      const translated = JSON.parse(
        JSON.stringify(originalConnect)
      );

      const tasks: Promise<any>[] = [];
      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      // Text (HTML)
      if (translated.text) {
        tasks.push(
          t(translated.text).then((r) => (translated.text = r))
        );
      }

      // Button name
      if (translated.button_name) {
        tasks.push(
          t(translated.button_name).then(
            (r) => (translated.button_name = r)
          )
        );
      }

      await Promise.all(tasks);
      setTranslatedConnect(translated);
    }

    translateConnect();
  }, [language, originalConnect]);

  if (!translatedConnect) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div dangerouslySetInnerHTML={{__html: translatedConnect.text, }} />
          <Link href={translatedConnect.link} className={styles.btn} >  {translatedConnect.button_name} </Link>
        </div>
      </div>
    </section>
  );
}
