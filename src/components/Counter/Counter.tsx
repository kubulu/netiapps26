"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Counter.module.scss";

interface CounterItemProps {
    end: number;
    suffix?: string;
    label: string;
    isDark?: boolean;
    duration?: number;
}

const CounterItem = ({ end, suffix = "", label, isDark, duration = 2000 }: CounterItemProps) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(end * easeOut));

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible, end, duration]);

    return (
        <div className={`${styles.card} ${isDark ? styles.dark : ""}`} ref={countRef}>
            <div className={styles.number}>
                {count}
                {suffix}
            </div>
            <div className={styles.label}>{label}</div>
        </div>
    );
};

export default function Counter(counter: any) {
  
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.counterGrid}>
                    {counter.counter.data.map((item: any, index: any) => (
                        <CounterItem
                            key={index}
                            end={item.count}
                            suffix={item.suffix}
                            label={item.label}
                            isDark={item.isdark}
                        />
                    ))}
                </div>

                <div className={styles.description}>
                    <div dangerouslySetInnerHTML={{__html: counter.counter.description}} />
                </div>
            </div>
        </section>
    );
}
