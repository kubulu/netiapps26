import Link from 'next/link';
import styles from './CareerCards.module.scss';

export default function CareerCards(jobList: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {jobList.jobList.map((job: any, index: any) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.jobTitle}>{job.title}</h3>
                                <p className={styles.location}>{job.location}</p>
                            </div>
                            <Link href={job.link} className={styles.applyLink}>
                                Apply Now
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

