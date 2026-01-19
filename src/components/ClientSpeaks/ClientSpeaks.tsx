"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ClientSpeaks.module.scss';

const testimonials = [
    {
        id: 1,
        rating: 5,
        text: "It was great working with NetiApps. Anyone can provide technology solutions but really understanding the business needs of a customer requires dedicated efforts as shown by NetiApps. Their solutions contributed to some outstanding support to automate DTDC's critical processes.",
        name: "Mrinal Chakraborty",
        designation: "Executive Vice President : Technology & Innovations",
        company: "DTDC",
        logo: "/images/dtdc-logo.png"
    },
    {
        id: 2,
        rating: 5,
        text: "NetiApps has been an invaluable partner in our digital transformation journey. Their team's technical expertise and commitment to quality have significantly improved our operational efficiency. Highly recommended for any complex enterprise solutions.",
        name: "Sarah Johnson",
        designation: "CTO",
        company: "TechFlow Solutions",
        logo: "/images/client1.png"
    },
    {
        id: 3,
        rating: 5,
        text: "The level of professionalism and creativity demonstrated by NetiApps is unmatched. They took our vision and turned it into a reality, exceeding our expectations at every step. A truly reliable technology partner.",
        name: "David Chen",
        designation: "Product Director",
        company: "Innovate Corp",
        logo: "/images/client2.png"
    },
    {
        id: 4,
        rating: 5,
        text: "Working with NetiApps was a seamless experience. Their attention to detail and ability to deliver on time were impressive. They truly understood our requirements and delivered a product that exceeded our expectations.",
        name: "Emily Davis",
        designation: "Marketing Head",
        company: "Global Systems",
        logo: "/images/client3.png"
    }
];

export default function ClientSpeaks() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Clients Speaks</h2>

                <div className={styles.sliderWrapper}>
                    <div className={styles.testimonialGrid}>
                        {testimonials.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${styles.testimonialCard} ${index === currentIndex ? styles.active : ''}`}
                            >
                                <div className="row">
                                    <div className="col-md-6 d-flex flex-column justify-content-between">
                                        <div className={styles.logoWrapper}>
                                            <Image
                                                src={item.logo}
                                                alt={item.company}
                                                width={140}
                                                height={50}
                                                className={styles.companyLogo}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>

                                        <div className={styles.authorInfo}>
                                            <div className={styles.rating}>
                                                {[...Array(item.rating)].map((_, i) => (
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
                                            <p className={styles.quoteText}>{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.dots}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

