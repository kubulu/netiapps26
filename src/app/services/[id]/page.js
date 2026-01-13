import InnerPageBanner from '@/components/InnerPageBanner';
import ConnectNow from '@/components/ConnectNow';
import LatestInsight from '@/components/LatestInsight';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServiceIntroduction from '@/components/ServiceIntroduction';
import ServiceDualList from '@/components/ServiceDualList';
import { services } from '@/data/servicesData';
import styles from './page.module.scss';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return services.map((service) => ({
        id: service.id,
    }));
}

export default async function ServiceDetail({ params }) {
    const { id } = await params;
    const service = services.find(s => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <main>
            <InnerPageBanner
                tag={service.tag}
                title={service.title}
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Services', link: '/services' },
                    { label: service.tag }
                ]}
                imageSrc={service.image}
            />

            <ServiceIntroduction
                title={service.tag}
                description={service.description}
                longDescription={service.longDescription}
            />

            <ServiceDualList />

            <section className={styles.contentSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={styles.mainContent}>
                                <h2 className={styles.subHeading}>Our Capabilities</h2>
                                <div className={styles.capabilitiesGrid}>
                                    {service.subServices.map((sub, index) => (
                                        <div key={index} className={styles.capabilityItem}>
                                            <Image src="/images/arrow.svg" alt="arrow" width={20} height={20} className="me-3" />
                                            <span>{sub}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <aside className={styles.sidebar}>
                                <div className={styles.detailCard}>
                                    <h3>Why Choose This Service?</h3>
                                    <ul className={styles.detailsList}>
                                        {service.details.map((detail, index) => (
                                            <li key={index}>
                                                <strong>{detail.title}</strong>
                                                <p>{detail.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <WhyChooseUs />
            <ConnectNow />
            <LatestInsight />
        </main>
    );
}
