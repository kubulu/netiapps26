import Image from 'next/image';
import Link from 'next/link';
import styles from './LatestInsight.module.scss';

const insights = [
    {
        id: 1,
        image: '/images/insight1.png',
        date: '12/12/2025',
        title: 'Unlocking Success: The Art of Talent Acquisition',
        link: '#',
    },
    {
        id: 2,
        image: '/images/insight2.png',
        date: '12/12/2025',
        title: 'Power of PHP Developers: Driving Web Development Success',
        link: '#',
    },
    {
        id: 3,
        image: '/images/insight3.png',
        date: '12/12/2025',
        title: 'Power of PHP Developers: Driving Web Development Success',
        link: '#',
    },
];

export default function LatestInsight() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Latest Insight</h2>
                <div className="row">
                    {insights.map((insight) => (
                        <div key={insight.id} className="col-lg-4 col-md-6 mb-4">
                            <Link href={insight.link} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={insight.image}
                                        alt={insight.title}
                                        fill
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <p className={styles.date}>{insight.date}</p>
                                    <h3 className={styles.title}>{insight.title}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
