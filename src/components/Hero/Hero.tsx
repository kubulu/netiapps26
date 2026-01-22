"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import styles from './Hero.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
    {
        id: 1,
        title: <><strong>Empower</strong> Your<br /><strong>Enterprise</strong> with Next-<br />Gen <strong>Technology</strong></>,
        description: "Empower Your Enterprise with Next-Gen Technology",
        image: "/images/HERO1.png",
        link: "/about"
    },
    {
        id: 2,
        title: <><strong>Transform</strong> Your<br /><strong>Business</strong> with Digital<br /><strong>Innovation</strong></>,
        description: "Transform Your Business with Digital Innovation",
        image: "/images/HERO1.png",
        link: "/services"
    }
];

export default function Hero() {
    return (
        <section className={styles.hero}>
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
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="container h-100 position-relative">
                            <div className="row h-100 align-items-center">
                                {/* Left Content */}
                                <div className="col-lg-6">
                                    <div className={styles.content}>
                                        <h1 className={styles.title}>
                                            {slide.title}
                                        </h1>

                                        <Link href={slide.link} className={styles.ctaBtn}>
                                            Read More
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Image/Illustration */}
                                <div className="col-lg-6 position-relative h-100 d-none d-lg-block">
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={slide.image}
                                            alt={slide.description}
                                            fill
                                            priority
                                            className={styles.heroImage}
                                        />
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
