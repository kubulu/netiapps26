import Image from 'next/image';
import styles from './CoreServices.module.scss';
import { getMediaUrl } from '@/lib/media';

const coreServices = [
    { id: 1, title: "Digital Transformation Consulting", icon: "/images/core1.svg" },
    { id: 2, title: "Product & Platform Strategy", icon: "/images/core2.svg" },
    { id: 3, title: "Business Process Analysis & Optimization", icon: "/images/core3.svg" },
    { id: 4, title: "Artificial Intelligence and Machine Learning", icon: "/images/core4.svg" },
    { id: 5, title: "Technology Road mapping", icon: "/images/core5.svg" },
    { id: 6, title: "AI Adoption & Readiness Assessment", icon: "/images/core6.svg" },
];

export default function CoreServices() {
    return (
        <section className={styles.section}>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {/* Left Content */}
                    <div className="col-lg-5">
                        <div className={styles.leftContent}>
                            <span className={styles.tagline}>Our Core Consulting Services</span>
                            <h2 className={styles.title}>
                                Driving Growth with<br />
                                Innovative Digital<br />
                                Solutions
                            </h2>
                        </div>
                    </div>

                    {/* Right Grid */}
                    <div className="col-lg-7">
                        <div className={styles.grid}>
                            {coreServices.map((service) => (
                                <div key={service.id} className={styles.gridItem}>
                                    <div className={styles.iconWrapper}>
                                        <Image
                                            src={getMediaUrl(service.icon)}
                                            alt={service.title}
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

