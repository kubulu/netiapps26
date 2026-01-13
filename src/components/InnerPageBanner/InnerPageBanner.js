"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './InnerPageBanner.module.scss';

export default function InnerPageBanner({ tag, title, breadcrumbs, imageSrc }) {
    const containerRef = useRef(null);
    const imageWrapperRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageWrapperRef.current) return;

            const scrollY = window.scrollY;
            const windowWidth = window.innerWidth;
            const containerWidth = imageWrapperRef.current.parentElement.offsetWidth;

            // Calculate max expansion needed to hit full viewport width
            const maxExpand = Math.max(0, windowWidth - containerWidth);

            // Effect range: expand over the first 500px of scroll
            const progress = Math.min(scrollY / 500, 1);
            const currentExpand = maxExpand * progress;

            imageWrapperRef.current.style.setProperty('--scroll-progress', progress);
            imageWrapperRef.current.style.setProperty('--scroll-expand', `${currentExpand}px`);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.section} ref={containerRef}>
            <div className="container">
                {/* Top Header Section */}
                <div className={styles.headerRow}>
                    <div className={styles.leftCol}>
                        <div className={styles.tagPill}>
                            {tag}
                        </div>
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                    </div>

                    <div className={styles.rightCol}>
                        <nav className={styles.breadcrumbNav}>
                            {breadcrumbs.map((item, index) => (
                                <span key={index} className={styles.breadcrumbItem}>
                                    {item.link ? (
                                        <Link href={item.link}>{item.label}</Link>
                                    ) : (
                                        <span className={styles.active}>{item.label}</span>
                                    )}
                                    {index < breadcrumbs.length - 1 && (
                                        <span className={styles.separator}>/</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Banner Image Section */}
                <div className={styles.imageWrapper} ref={imageWrapperRef}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={1400}
                        height={600}
                        priority
                        className={styles.bannerImg}
                    />
                </div>
            </div>
        </section>
    );
}
