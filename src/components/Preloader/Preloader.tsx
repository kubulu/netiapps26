"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.scss';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if we've already shown the loader this session
        const hasLoaded = sessionStorage.getItem('hasLoaded');

        if (hasLoaded) {
            setIsLoading(false);
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            // Mark as loaded in session storage
            sessionStorage.setItem('hasLoaded', 'true');

            // Allow exit animation to finish before removing from DOM
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        }, 2000); // Show for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`${styles.preloader} ${!isLoading ? styles.hidden : ''}`}>
            <div className={styles.logoWrapper}>
                <Image
                    src="/images/logo.svg"
                    alt="Netiapps"
                    width={200}
                    height={60}
                    priority
                    className={styles.logo}
                />
            </div>
        </div>
    );
}
