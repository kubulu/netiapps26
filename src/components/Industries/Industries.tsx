import Image from 'next/image';
import styles from './Industries.module.scss';


export default function Industries(industries: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{industries.industries.title}</h2>
            </div>

            <div className={styles.scrollWrapper}>
                <div className={styles.scrollContent}>
                    {industries.industries.industry_section.map((indus: any, index: any) => (
                        <div
                            key={index}
                            className={`${styles.card}`}
                        >
                            <img
                                src={indus.image}
                                alt={indus.title}
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
