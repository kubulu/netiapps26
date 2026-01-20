"use client";

import styles from './OfficeLocations.module.scss';
import { Globe, MapPin, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const locations = [
    {
        title: "Head Office",
        city: "Bangalore, India",
        address: "No. 406, 9th Main Road, HRBR Layout 1st Block, Kalyan Nagar, Bangalore - 560 043.",
        phone: "+91 80 1234 5678",
        mapLink: "#"
    },
    {
        title: "US Office",
        city: "New York, USA",
        address: "44 Court St Brooklyn, NY 11201",
        phone: "(315) 291-8670",
        mapLink: "#"
    },
    {
        title: "Singapore Office",
        city: "Singapore, UK",
        address: "No 7 Temasek Boulevard#12-07 PMB1157 Suntec Tower One Singapore, 038987",
        mapLink: "#"
    }
];

export default function OfficeLocations() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {locations.map((loc, index) => (
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
