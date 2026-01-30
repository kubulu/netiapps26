"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./WhyChooseUs.module.scss";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs(why: any) {
  const { language, translate } = useLanguage();

  const originalWhy = why.why;
  const [translatedWhy, setTranslatedWhy] =
    useState(originalWhy);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /* ---------- TRANSLATION ---------- */

  useEffect(() => {
    async function translateWhy() {
      // EN → no translation
      if (language.toUpperCase() === "EN") {
        setTranslatedWhy(originalWhy);
        return;
      }

      const translated = JSON.parse(
        JSON.stringify(originalWhy)
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

      // Reason texts
      translated.reasons?.forEach((reason: any) => {
        if (reason.text) {
          tasks.push(
            t(reason.text).then((r) => (reason.text = r))
          );
        }
      });

      await Promise.all(tasks);
      setTranslatedWhy(translated);
    }

    translateWhy();
  }, [language, originalWhy]);

  if (!translatedWhy) return null;

  /* ---------- DRAG SCROLL ---------- */

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>
          {translatedWhy.title}
        </h2>
      </div>

      <div
        className={styles.scrollWrapper}
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className={styles.cardsRow}>
          {translatedWhy.reasons.map(
            (reason: any, index: number) => (
              <div key={index} className={styles.card}>
                <div className={styles.numberCircle}>
                  {reason.number}
                </div>
                <p className={styles.content}>
                  {reason.text}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
