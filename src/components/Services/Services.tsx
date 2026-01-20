"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Services.module.scss';

export default function Services(services: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={`${styles.header} text-center mb-5`}>
                    <div dangerouslySetInnerHTML={{ __html: services.services.title}} />
                </div>

                <div className={styles.servicesWrapper}>
                    {services.services.service_content.map((service: any, index: any) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
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
                                            <img
                                                src={service.img}
                                                alt={service.title}
                                                width={400}
                                                height={250}
                                                className={styles.mainImage}
                                            />
                                        </div>

                                        <div className={styles.detailsBlock}>
                                            <ul className={styles.subServicesList}>
                                                {service.sub_services.map((item: any, i: any) => (
                                                    <li key={i}>
                                                        <Link href={item.link}>
                                                            {item.item}
                                                            <img
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

                                            <Link href={service.button_link} className={styles.readMore}>
                                                {service.button_name}
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

