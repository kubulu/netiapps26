import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import Image from 'next/image';
import styles from './page.module.scss';
import ClientSpeaks from '@/components/ClientSpeaks/ClientSpeaks';

export const metadata: Metadata = {
    title: 'Our Clients | NetiApps',
    description: 'Trusted by leading companies across the globe. See who we have worked with.',
};

const clients = [
    { id: 1, name: 'Capgemini', logo: '/images/client1.png' },
    { id: 4, name: 'Ujjivan', logo: '/images/client4.png' },
    { id: 5, name: 'Frog', logo: '/images/client5.png' },
    { id: 6, name: 'DTDC', logo: '/images/client6.png' },
    { id: 2, name: 'Flipkart', logo: '/images/client2.png' },
    { id: 3, name: 'Altran', logo: '/images/client3.png' },
    { id: 7, name: 'Client 4', logo: '/images/client4.png' }, // Adding some duplicates to fill grid for demo
    { id: 8, name: 'Client 1', logo: '/images/client1.png' },
];

export default function ClientsPage() {
    return (
        <main>
            <InnerPageBanner
                tag="About Us"
                title="Our Clients"
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'About', link: '#' },
                    { label: 'Clients' }
                ]}
                imageSrc="/images/innerbanner.png"
            />

            <section className={styles.clientsSection}>
                <div className="container">
                    <div className={styles.description}>
                        <p>
                            We build long-term relationships with our clients by delivering exceptional value and quality.
                            Our diverse portfolio spans across various industries, from startups to Fortune 500 companies.
                        </p>
                    </div>

                    <div className={styles.clientsGrid}>
                        {clients.map((client) => (
                            <div key={client.id} className={styles.clientCard}>
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    width={160}
                                    height={80}
                                    className={styles.logo}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ClientSpeaks />
        </main>
    );
}
