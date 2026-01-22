import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceHighlight.module.scss';

export default function ServiceHighlight(highlight: any) {

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row align-items-stretch g-4">
                    {/* Left Card */}
                    <div className="col-lg-6">
                        <div className={styles.leftCard}>
                                <h2 className={styles.title}>
                                    {highlight.highlight.title}
                                </h2>

                            <ul className={styles.linkList}>
                                {highlight.highlight.sub_menu.map((service: any, index: any) => (
                                    <li key={index}>
                                        <Link href={service.link} className={styles.serviceLink}>
                                            {service.lable}
                                            <span className={styles.arrow}>→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="col-lg-6">
                        <div className={styles.rightCardWrapper}>
                            <div className={styles.imageOverlay}>
                                <img
                                    src={highlight.highlight.image}
                                    alt="Service Illustration"
                                    width={500}
                                    height={400}
                                    className={styles.mainImg}
                                />
                            </div>
                            <div className={styles.rightCard}>
                                <div className={styles.description}>
                                    <div dangerouslySetInnerHTML={{__html: highlight.highlight.description}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

