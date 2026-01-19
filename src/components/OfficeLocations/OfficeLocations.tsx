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
        address: "45 Broadway, Suite 200, New York, NY 10006, United States",
        phone: "+1 212 555 0123",
        mapLink: "#"
    },
    {
        title: "European Regional Office",
        city: "London, UK",
        address: "1 Canada Square, Canary Wharf, London E14 5AB, United Kingdom",
        phone: "+44 20 7123 4567",
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
                            <div className={styles.bgMap}>
                                <Image
                                    src="/images/solar_global-outline.svg"
                                    alt="World Map"
                                    width={300}
                                    height={180}
                                    className={styles.mapImage}
                                />
                                <div className={styles.pin}>
                                    <MapPin size={20} fill="#E30613" stroke="white" />
                                </div>
                            </div>

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

                                <Link href={loc.mapLink} className={styles.mapLink}>
                                    Open map
                                    <ArrowRight size={16} />
                                </Link>

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
