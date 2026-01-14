import Image from 'next/image';
import styles from './Industries.module.scss';

interface Industry {
    id: number;
    title: string;
    image: string;
    featured?: boolean;
}

const industries: Industry[] = [
    {
        id: 1,
        title: 'Technology',
        image: '/images/indus1.png',
        featured: true,
    },
    {
        id: 2,
        title: 'Banking',
        image: '/images/indus2.png',
    },
    {
        id: 3,
        title: 'Manufacturing',
        image: '/images/indus3.png',
    },
    {
        id: 4,
        title: 'Health Care',
        image: '/images/indus4.png',
    },
    {
        id: 5,
        title: 'Education',
        image: '/images/indus1.png',
    },
    {
        id: 6,
        title: 'E-commerce',
        image: '/images/indus2.png',
    },
    {
        id: 7,
        title: 'Logistics',
        image: '/images/indus3.png',
    },
    {
        id: 8,
        title: 'Retail',
        image: '/images/indus4.png',
    },
];

export default function Industries() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Powering progress across industries</h2>
            </div>

            <div className={styles.scrollWrapper}>
                <div className={styles.scrollContent}>
                    {industries.map((indus) => (
                        <div
                            key={indus.id}
                            className={`${styles.card} ${indus.featured ? styles.featured : ''}`}
                        >
                            <Image
                                src={indus.image}
                                alt={indus.title}
                                fill
                                className={styles.image}
                            />
                            <div className={styles.overlay}>
                                <h3 className={styles.cardTitle}>{indus.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
