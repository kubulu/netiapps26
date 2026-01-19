"use client";

import { useEffect, useState } from "react";
import styles from "./Solutions.module.scss";

type BackendItem = {
  img: string | false;
  title?: string;
  text_color?: "light" | "dark";
};

type CardItem = {
  img?: string;
  title?: string;
  text_color: "light" | "dark";
};

const shuffle = (arr: CardItem[]) =>
  [...arr].sort(() => Math.random() - 0.5);

export default function Solutions({ solution }: any) {
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    if (!solution?.image_content) return;

    const normalized: CardItem[] = solution.image_content
      .map((item: BackendItem) => ({
        img: typeof item.img === "string" ? item.img : undefined,
        title: item.title,
        text_color: item.text_color || "light",
      }))
      // ❗ keep only valid cards
      .filter((item: CardItem) => item.img || item.title);

    if (!normalized.length) return;

    setCards(shuffle(normalized).slice(0, 4));
  }, [solution]);

  if (cards.length < 4) return null;

  return (
    <section className={styles.section}>
      {/* SECTION TITLE */}
      {solution?.title && (
        <div
          className="container text-center mb-5"
          dangerouslySetInnerHTML={{ __html: solution.title }}
        />
      )}

      <div className="container">
        <div className={styles.grid}>
          {/* BIG */}
          <div className={`${styles.card} ${styles.bigCard}`}>
            <Card item={cards[0]} />
          </div>

          <div className={styles.rightColumn}>
            {/* WIDE */}
            <div className={`${styles.card} ${styles.wideCard}`}>
              <Card item={cards[1]} />
            </div>

            <div className={styles.bottomRow}>
              {/* SMALL */}
              <div className={`${styles.card} ${styles.smallCard}`}>
                <Card item={cards[2]} />
              </div>

              {/* SMALL */}
              <div className={`${styles.card} ${styles.smallCard}`}>
                <Card item={cards[3]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function Card({ item }: { item: CardItem }) {
  const isTextOnly = !item.img;

  return (
    <>
      {/* IMAGE */}
      {item.img && (
        <img src={item.img} alt="" className={styles.image} />
      )}

      {/* TEXT */}
      {item.title && (
        <div
          className={`${styles.cardContent} ${
            isTextOnly ? styles.centerContent : ""
          }`}
        >
          <div
            className={
              item.text_color === "dark"
                ? styles.cardTitleDark
                : styles.cardTitle
            }
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </div>
      )}
    </>
  );
}
