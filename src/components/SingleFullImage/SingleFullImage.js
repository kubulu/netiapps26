"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './SingleFullImage.module.scss';

export default function SingleFullImage({ imageSrc = '/images/singlefullimage.png', alt = 'Full Width Visual' }) {
    const imageRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current) return;
            const element = imageRef.current;
            const container = element.parentElement;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate progress of container through viewport (0 to 1)
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                // Translate image vertically (approx -50px to 50px movement space)
                const translateY = (progress - 0.5) * 100;
                element.style.transform = `scale(1.2) translateY(${translateY}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.imageWrapper}>
                <Image
                    ref={imageRef}
                    src={imageSrc}
                    alt={alt}
                    width={1920}
                    height={1080}
                    className={styles.mainImg}
                />
            </div>
        </section>
    );
}
