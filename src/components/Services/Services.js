"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Services.module.scss';

const services = [
    {
        id: 1,
        title: "Digital Strategy and Consulting",
        image: "/images/service1.png",
        subServices: [
            "Digital Transformation Consulting",
            "Product & Platform Strategy",
            "Business Process Analysis & Optimization",
            "Technology Road mapping",
            "AI Adoption & Readiness Assessment"
        ]
    },
    {
        id: 2,
        title: "Web Development Services",
        image: "/images/service1.png", // Using same image for demo
        subServices: ["Frontend Development", "Backend Systems", "Full Stack Solutions"]
    },
    {
        id: 3,
        title: "Mobile App Development",
        image: "/images/service1.png",
        subServices: ["iOS Apps", "Android Apps", "React Native"]
    },
    {
        id: 4,
        title: "Custom Software Development",
        image: "/images/service1.png",
        subServices: ["SaaS Product Dev", "Enterprise Software", "Legacy Migration"]
    },
    {
        id: 5,
        title: "Cloud and DevOps Services",
        image: "/images/service1.png",
        subServices: ["AWS/Azure", "CI/CD Pipelines", "Infrastructure as Code"]
    },
    {
        id: 6,
        title: "UI/UX Experience Design",
        image: "/images/service1.png",
        subServices: ["User Research", "Wireframing", "Visual Design"]
    },
    {
        id: 7,
        title: "Integration and API Services",
        image: "/images/service1.png",
        subServices: ["Third Party Integration", "Custom API Dev", "Microservices"]
    },
    {
        id: 8,
        title: "Maintenance and Managed Services",
        image: "/images/service1.png",
        subServices: ["24/7 Support", "Performance Monitoring", "Security Audits"]
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className={styles.header}>
                        With a <strong>strong</strong> focus on<br />
                        analytics and <strong>performance</strong> optimization
                    </h2>
                </div>

                <div className={styles.servicesWrapper}>
                    {services.map((service, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={service.id}
                                className={`${styles.serviceItem} ${isActive ? styles.active : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Vertical Header - Always Visible */}
                                <div className={styles.verticalHeader}>
                                    <div className={styles.iconBox}>
                                        <Image
                                            src={isActive ? "/images/minus.svg" : "/images/add.svg"}
                                            alt="Toggle"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                    <h3 className={styles.verticalTitle}>{service.title}</h3>
                                </div>

                                {/* Expanded Content */}
                                <div className={styles.expandedWrapper}>
                                    <div className={styles.expandedContent}>
                                        <div className={styles.imageBlock}>
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                width={400}
                                                height={250}
                                                className={styles.mainImage}
                                            />
                                        </div>

                                        <div className={styles.detailsBlock}>
                                            <ul className={styles.subServicesList}>
                                                {service.subServices.map((item, i) => (
                                                    <li key={i}>
                                                        <Link href="#">
                                                            {item}
                                                            <Image
                                                                src="/images/arrow.svg"
                                                                alt="Arrow"
                                                                width={16}
                                                                height={16}
                                                                className="ms-2"
                                                            />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link href="/services" className={styles.readMore}>
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
