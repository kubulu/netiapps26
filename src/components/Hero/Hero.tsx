"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import styles from "./Hero.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import DottedWave from './DottedWave';


import { useEffect, useState } from "react";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";

export default function Hero(slides: any) {
  const { language, translate } = useLanguage();

  const originalSlides = slides.slides;
  const [translatedSlides, setTranslatedSlides] = useState(originalSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function translateSlides() {
      // If English → use original content
      if (language.toUpperCase() === "EN") {
        setTranslatedSlides(originalSlides);
        return;
      }


      // Deep clone (same as Footer)
      const translated = JSON.parse(JSON.stringify(originalSlides));
      const tasks: Promise<any>[] = [];

      const t = (text: string) =>
        cachedTranslate(text, language, translate);

      translated.forEach((slide: any) => {
        if (slide.title) {
          tasks.push(
            t(slide.title).then((r) => (slide.title = r))
          );
        }

        if (slide.button_name) {
          tasks.push(
            t(slide.button_name).then((r) => (slide.button_name = r))
          );
        }

        if (slide.description) {
          tasks.push(
            t(slide.description).then((r) => (slide.description = r))
          );
        }
      });

      await Promise.all(tasks);
      setTranslatedSlides(translated);
    }

    translateSlides();
  }, [language, originalSlides]);

  return (
    <section className={styles.hero}>
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DottedWave color="rgba(0, 0, 0, 0.1)" />
    </div>
    <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: `swiper-pagination-bullet ${styles.swiperBullet}`,
            bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiperBulletActive}`
        }}
        className={styles.swiperContainer}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
        {translatedSlides.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="container h-100 position-relative">
              <div className="row h-100 align-items-center">
                {/* Left Content */}
                <div className="col-lg-6">
                  <div className={styles.content}>
                    <div className={styles.title}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: slide.title,
                        }}
                      />
                    </div>

                    <Link
                      href={slide.link}
                      className={styles.ctaBtn}
                    >
                      {slide.button_name}
                    </Link>
                  </div>
                </div>

                {/* Right Image */}
                <div className="col-lg-6 position-relative h-100 d-none d-lg-block">
                  <div className={styles.imageWrapper}>
                    <img
                      src={slide.image}
                      alt={slide.description}
                      className={styles.heroImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination */}
        <div className="container position-relative h-100 pointer-events-none">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6">
              <div
                className={`${styles.paginationWrapper} custom-pagination`}
              ></div>
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
