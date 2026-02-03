"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import styles from "./Hero.module.scss";
import "swiper/css";

import "swiper/css/effect-fade";



import { useEffect, useState, useMemo } from "react";
import { cachedTranslate, useLanguage } from "@/context/LanguageContext";
import { getMediaUrl } from "@/lib/media";

export default function Hero(slides: any) {
    const { language, translate } = useLanguage();

    const originalSlides = useMemo(() => {
        const dummySlides = [
            {
                title: "<strong>Scale Your Business</strong><br>With Advanced Technology",
                button_name: "Discover More",
                link: "/services",
                description: "Empowering your enterprise with cutting-edge solutions."
            },
        ];
        return [...(slides.slides || []), ...dummySlides];
    }, [slides.slides]);
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

    const videos = [
        getMediaUrl("/images/herovideo1.mp4"),
        getMediaUrl("/images/videobanner2.mp4"),
        getMediaUrl("/images/videobanner4.mp4"),
    ];

    return (
        <section className={styles.hero}>
            <div className="w-100 h-100">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                    className={styles.swiperContainer}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {translatedSlides.map((slide: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="d-flex flex-column flex-lg-row h-100 position-relative">
                                {/* Desktop/Mobile Video Wrapper */}
                                {/* On Desktop: Absolute right half. On Mobile: Relative, Stacked (order 2?) */}
                                <div
                                    className="d-none d-lg-block position-absolute top-0 end-0 w-50 h-100"
                                    style={{ zIndex: 1, backgroundColor: '#ffffff' }}
                                >
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            backgroundColor: '#ffffff',
                                            opacity: 0.999,
                                            display: 'block',
                                            filter: 'contrast(1)',
                                        }}
                                    >
                                        <source src={videos[index % videos.length]} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                {/* Text Content Area */}
                                <div className="container h-100 position-relative d-flex align-items-center" style={{ zIndex: 2 }}>
                                    <div className="row w-100">
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
                                    </div>
                                </div>

                                {/* Mobile Video (Visible only on mobile) */}
                                <div
                                    className="d-lg-none w-100 position-relative"
                                    style={{ height: '300px', backgroundColor: '#ffffff' }}
                                >
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    >
                                        <source src={videos[index % videos.length]} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </section>
    );
}
