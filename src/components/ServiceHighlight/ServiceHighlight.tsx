import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceHighlight.module.scss';

export default function ServiceHighlight() {
    const subServices = [
        { label: "Digital Transformation Consulting", link: "/services/1" },
        { label: "Product & Platform Strategy", link: "#" },
        { label: "Business Process Analysis & Optimization", link: "#" },
        { label: "Technology Road mapping", link: "#" },
        { label: "AI Adoption & Readiness Assessment", link: "#" }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row align-items-stretch g-4">
                    {/* Left Card */}
                    <div className="col-lg-6">
                        <div className={styles.leftCard}>
                            <Link href="/services/1" className={styles.titleLink}>
                                <h2 className={styles.title}>
                                    Digital Strategy and<br /> Consulting
                                </h2>
                            </Link>

                            <ul className={styles.linkList}>
                                {subServices.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.link} className={styles.serviceLink}>
                                            {service.label}
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
                                <Image
                                    src="/images/serviceImg.png"
                                    alt="Service Illustration"
                                    width={500}
                                    height={400}
                                    className={styles.mainImg}
                                />
                            </div>
                            <div className={styles.rightCard}>
                                <div className={styles.description}>
                                    <p>
                                        In a rapidly evolving digital landscape, technology alone is not enough.
                                        Our Digital Strategy & Consulting services help organizations align
                                        business goals with the right digital, AI, and automation
                                        strategies—driving measurable impact, efficiency, and long-term growth.
                                    </p>
                                    <p>
                                        We partner with enterprises to design, plan, and execute digital
                                        transformation journeys that are practical, scalable, and future-ready.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

