"use client";

import { useRef, useState } from 'react';
import styles from './WhyChooseUs.module.scss';

const reasons = [
    {
        id: '01',
        text: 'Strategy-led, execution-focused approach'
    },
    {
        id: '02',
        text: 'Deep expertise in web, mobile, AI, and automation'
    },
    {
        id: '03',
        text: 'Enterprise-grade delivery standards'
    },
    {
        id: '04',
        text: 'Client-centric solutions with a focus on ROI'
    },
    {
        id: '05',
        text: '24/7 support and proactive maintenance'
    },
    {
        id: '06',
        text: 'Scalable and future-proof technology stack'
    }
];

export default function WhyChooseUs(why: any) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);


    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>{why.why.title}</h2>
            </div>

            <div
                className={styles.scrollWrapper}
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseUp}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
           <div className={styles.cardsRow}>
                    {why.why.reasons.map((reason: any, index: any) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.numberCircle}>
                                {reason.number}
                            </div>
                            <p className={styles.content}>
                                {reason.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


