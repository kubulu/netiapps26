import Image from 'next/image';
import styles from './ClientSpeaks.module.scss';

const testimonials = [
    {
        id: 1,
        rating: 5,
        text: "It was great working with NetiApps. Anyone can provide technology solutions but really understanding the business needs of a customer requires dedicated efforts as shown by NetiApps. Their solutions contributed to some outstanding support to automate DTDC's critical processes.",
        name: "Mrinal Chakraborty",
        designation: "Executive Vice President : Technology & Innovations",
        company: "DTDC",
        logo: "/images/dtdc-logo.png"
    }
];

export default function ClientSpeaks() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Clients Speaks</h2>

                <div className={styles.testimonialGrid}>
                    {testimonials.map((item) => (
                        <div key={item.id} className={styles.testimonialCard}>
                            <div className="row">
                                <div className="col-md-6 d-flex flex-column justify-content-between">
                                    <div className={styles.logoWrapper}>
                                        <Image
                                            src={item.logo}
                                            alt={item.company}
                                            width={140}
                                            height={50}
                                            className={styles.companyLogo}
                                        />
                                    </div>

                                    <div className={styles.authorInfo}>
                                        <div className={styles.rating}>
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Image
                                                    key={i}
                                                    src="/images/star.png"
                                                    alt="Star"
                                                    width={18}
                                                    height={18}
                                                    className={styles.star}
                                                />
                                            ))}
                                        </div>
                                        <h4 className={styles.name}>{item.name}</h4>
                                        <p className={styles.designation}>{item.designation}</p>
                                    </div>
                                </div>

                                <div className="col-md-6 pt-4 pt-md-0">
                                    <div className={styles.quoteContent}>
                                        <div className={styles.quoteIcon}>
                                            <Image
                                                src="/images/quote.svg"
                                                alt="Quote"
                                                width={48}
                                                height={38}
                                            />
                                        </div>
                                        <p className={styles.quoteText}>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

