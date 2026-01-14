import Link from 'next/link';
import styles from './CareerCards.module.scss';

const jobListings = [
    {
        id: 1,
        title: 'Sr. WordPress Developer',
        location: 'Bangalore'
    },
    {
        id: 2,
        title: 'Senior PHP Laravel Developer',
        location: 'Bangalore'
    },
    {
        id: 3,
        title: 'Sr. Full Stack/ Full Stack Developer',
        location: 'Bangalore'
    },
    {
        id: 4,
        title: 'Business Analyst',
        location: 'Bangalore'
    },
    {
        id: 5,
        title: 'PHP Developer',
        location: 'Bangalore'
    },
    {
        id: 6,
        title: 'Sr. Designer',
        location: 'Bangalore'
    }
];

export default function CareerCards() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {jobListings.map((job) => (
                        <div key={job.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.jobTitle}>{job.title}</h3>
                                <p className={styles.location}>{job.location}</p>
                            </div>
                            <Link href={`/careers/${job.id}`} className={styles.applyLink}>
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

