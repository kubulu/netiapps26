"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ClientSpeaks.module.scss";

type FeedbackItem = {
  rating: string;
  feedback: string;
  name: string;
  designation: string;
  company: string;
  logo: string;
};

type ClientSpeaksProps = {
  testimonials: {
    title: string;
    feedback: FeedbackItem[];
  };
};

export default function ClientSpeaks({ testimonials }: ClientSpeaksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const feedbackList = testimonials?.feedback || [];

  useEffect(() => {
    if (!feedbackList.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === feedbackList.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [feedbackList.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{testimonials.title}</h2>

        <div className={styles.sliderWrapper}>
          <div className={styles.testimonialGrid}>
            {feedbackList.map((item, index) => (
              <div
                key={index}
                className={`${styles.testimonialCard} ${
                  index === currentIndex ? styles.active : ""
                }`}
              >
                <div className="row">
                  <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div className={styles.logoWrapper}>
                      <img
                        src={item.logo}
                        alt={item.company}
                        width={140}
                        height={50}
                        className={styles.companyLogo}
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    <div className={styles.authorInfo}>
                      <div className={styles.rating}>
                        {[...Array(Number(item.rating))].map((_, i) => (
                          <Image
                            key={i}
                            src="/images/star.png"
                            alt="Star"
                            width={18}
                            height={18}
                            className={styles.star}
                          />
                        ))}
                      </div>
                      <h4 className={styles.name}>{item.name}</h4>
                      <p className={styles.designation}>{item.designation}</p>
                    </div>
                  </div>

                  <div className="col-md-6 pt-4 pt-md-0">
                    <div className={styles.quoteContent}>
                      <div className={styles.quoteIcon}>
                        <Image
                          src="/images/quote.svg"
                          alt="Quote"
                          width={48}
                          height={38}
                        />
                      </div>
                      <p className={styles.quoteText}>{item.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dots}>
            {feedbackList.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
