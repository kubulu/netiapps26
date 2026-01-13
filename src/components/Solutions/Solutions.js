import Image from 'next/image';
import styles from './Solutions.module.scss';

export default function Solutions() {
    return (
        <section className={styles.section}>
            <div className="container text-center mb-5">
                <p className={styles.subtext}>Creating Digital Experiences Since 2006</p>
                <h2 className={styles.mainTitle}>
                    <span>Our Expertise Maximum Customer Success</span>
                </h2>
            </div>

            <div className="container">
                <div className={styles.grid}>
                    {/* Big Left Card */}
                    <div className={`${styles.card} ${styles.bigCard}`}>
                        <Image
                            src="/images/solution1.png"
                            alt="AI Solutions"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>AI and Intelligent<br />Solutions</h3>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        {/* Top Wide Card */}
                        <div className={`${styles.card} ${styles.wideCard}`}>
                            <Image
                                src="/images/solution2.png"
                                alt="Data Analytics"
                                fill
                                className={styles.image}
                            />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Data<br />Analytics<br />and BI</h3>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className={styles.bottomRow}>
                            {/* Image Only Card (Small) */}
                            <div className={`${styles.card} ${styles.smallCard}`}>
                                <Image
                                    src="/images/solution3.png"
                                    alt="E-commerce"
                                    fill
                                    className={styles.image}
                                />
                            </div>

                            {/* Text Only Card (Small) */}
                            <div className={`${styles.card} ${styles.textCard}`}>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitleDark}>Business<br />Process<br />Automation</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
