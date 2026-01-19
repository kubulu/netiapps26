"use client";

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './ContactInfo.module.scss';

const contactDetails = [
    {
        icon: MapPin,
        title: 'Visit Us',
        details: [
            'NetiApps Technologies',
            '123 Business Avenue',
            'Tech Park, Bangalore - 560001',
            'Karnataka, India'
        ]
    },
    {
        icon: Phone,
        title: 'Call Us',
        details: [
            '+91 80 1234 5678',
            '+91 80 8765 4321',
            'Toll Free: 1800 123 4567'
        ]
    },
    {
        icon: Mail,
        title: 'Email Us',
        details: [
            'info@netiapps.com',
            'sales@netiapps.com',
            'support@netiapps.com'
        ]
    },
    {
        icon: Clock,
        title: 'Business Hours',
        details: [
            'Monday - Friday: 9:00 AM - 6:00 PM',
            'Saturday: 10:00 AM - 4:00 PM',
            'Sunday: Closed'
        ]
    }
];

export default function ContactInfo() {
    return (
        <section className={styles.contactInfo}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Get in Touch</h2>
                    <p className={styles.subtitle}>
                        We're here to help and answer any question you might have.
                        We look forward to hearing from you.
                    </p>
                </div>

                <div className={styles.grid}>
                    {contactDetails.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={28} />
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <div className={styles.details}>
                                    {item.details.map((detail, idx) => (
                                        <p key={idx}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </section>
    );
}
