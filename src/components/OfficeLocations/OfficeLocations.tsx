"use client";

import styles from './OfficeLocations.module.scss';
import { Globe, MapPin, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function OfficeLocations(locations: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {locations.locations.map((loc: any, index: any) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{loc.title}</h3>

                                <div className={styles.infoRow}>
                                    <Globe size={18} className={styles.icon} />
                                    <span className={styles.text}>{loc.city}</span>
                                </div>

                                <div className={styles.infoRow}>
                                    <MapPin size={18} className={styles.icon} />
                                    <span className={styles.text}>{loc.address}</span>
                                </div>

                                <div className={styles.divider}></div>

                                <a href={`tel:${loc.phone}`} className={styles.phoneLink}>
                                    <Phone size={18} className={styles.icon} />
                                    {loc.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
