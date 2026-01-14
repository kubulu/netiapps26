import Image from 'next/image';
import styles from './ClientLogos.module.scss';

const clients = [
    { id: 1, name: 'Capgemini', logo: '/images/client1.png' },
    { id: 4, name: 'Ujjivan', logo: '/images/client4.png' },
    { id: 5, name: 'Frog', logo: '/images/client5.png' },
    { id: 6, name: 'DTDC', logo: '/images/client6.png' },
    { id: 2, name: 'Flipkart', logo: '/images/client2.png' },
    { id: 3, name: 'Altran', logo: '/images/client3.png' },
];

export default function ClientLogos() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.clientHeading}>Trusted by top-tier companies</div>
                <div className={styles.wrapper}>
                    {clients.map((client) => (
                        <div key={client.id} className={styles.logoBox}>
                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={110}
                                height={60}
                                className={styles.logo}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

