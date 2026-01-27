"use client";

import { useEffect, useState } from "react";
import styles from "./Solutions.module.scss";

/* ---------- TYPES ---------- */

type BackendItem = {
  img: string | false;
  title?: string;
  text_color?: "light" | "dark";
  link?: string; // ✅ link from backend
};

type CardItem = {
  img?: string;
  title?: string;
  text_color: "light" | "dark";
  link?: string;
};

/* ---------- UTILS ---------- */

const shuffle = (arr: CardItem[]) =>
  [...arr].sort(() => Math.random() - 0.5);

/* ---------- COMPONENT ---------- */

export default function Solutions({ solution }: any) {
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    if (!solution?.image_content) return;

    const normalized: CardItem[] = solution.image_content
      .map((item: BackendItem) => ({
        img: typeof item.img === "string" ? item.img : undefined,
        title: item.title,
        text_color: item.text_color || "light",
        link: item.link, // ✅ map link
      }))
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
          <CardWrapper
            item={cards[0]}
            className={`${styles.card} ${styles.bigCard}`}
          />

          <div className={styles.rightColumn}>
            {/* WIDE */}
            <CardWrapper
              item={cards[1]}
              className={`${styles.card} ${styles.wideCard}`}
            />

            <div className={styles.bottomRow}>
              {/* SMALL */}
              <CardWrapper
                item={cards[2]}
                className={`${styles.card} ${styles.smallCard}`}
              />

              {/* SMALL */}
              <CardWrapper
                item={cards[3]}
                className={`${styles.card} ${styles.smallCard}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CARD WRAPPER ---------- */

function CardWrapper({
  item,
  className,
}: {
  item: CardItem;
  className: string;
}) {
  // If link exists → clickable card
  if (item.link) {
    return (
      <a
        href={item.link}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        style={{ cursor: "pointer" }}
      >
        <Card item={item} />
      </a>
    );
  }

  // No link → normal card
  return (
    <div className={className}>
      <Card item={item} />
    </div>
  );
}

/* ---------- CARD ---------- */

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
