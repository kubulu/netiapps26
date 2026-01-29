"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import styles from './Hero.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import DottedWave from './DottedWave';

export default function Hero(slides: any) {
    const [activeIndex, setActiveIndex] = useState(0);

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
                {slides.slides.map((slide: any, index: any) => (
                    <SwiperSlide key={index}>
                        <div className="container h-100 position-relative">
                            <div className="row h-100 align-items-center">
                                {/* Left Content */}
                                <div className="col-lg-12">
                                    <div className={styles.content}>
                                        <div className={styles.title}>
                                            <div dangerouslySetInnerHTML={{ __html: slide.title }} />
                                        </div>

                                        <Link href={slide.link} className={styles.ctaBtn}>
                                            {slide.button_name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Pagination Container */}
                <div className="container position-relative h-100 pointer-events-none">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-6">
                            <div className={`${styles.paginationWrapper} custom-pagination`}></div>
                        </div>
                    </div>
                </div>
            </Swiper>
        </section>
    );
}
