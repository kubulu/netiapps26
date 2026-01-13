import Link from 'next/link';
import styles from './page.module.scss';

// Job data - in a real app, this would come from a database
const jobData = {
    1: {
        title: 'Sr. WordPress Developer',
        position: 'Sr. WordPress Developer',
        qualification: 'Any Degree',
        experience: '4-7 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    },
    2: {
        title: 'Senior PHP Laravel Developer',
        position: 'Senior PHP Laravel Developer',
        qualification: 'Any Degree',
        experience: '5-8 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    },
    3: {
        title: 'Sr. Full Stack/ Full Stack Developer',
        position: 'Sr. Full Stack/ Full Stack Developer',
        qualification: 'Any Degree',
        experience: '4-7 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    },
    4: {
        title: 'Business Analyst',
        position: 'Business Analyst',
        qualification: 'Any Degree',
        experience: '4-7 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    },
    5: {
        title: 'PHP Developer',
        position: 'PHP Developer',
        qualification: 'Any Degree',
        experience: '3-5 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    },
    6: {
        title: 'Sr. Designer',
        position: 'Sr. Designer',
        qualification: 'Any Degree',
        experience: '5-8 Years of Experience',
        responsibilities: [
            'Analyzing Requirements: You\'ll be responsible for thoroughly understanding client needs and translating them into actionable plans.',
            'Creating Visual Guides: You\'ll develop user flow diagrams and process flows to help illustrate project requirements and processes.',
            'Automation: You\'ll work with a team to create and execute test scripts in UFT, ensuring that our solutions meet client expectations.',
            'Data Quality: You\'ll contribute to the project through verification and validation of data and application elements, ensuring accuracy and functionality.',
            'Client Interaction: You\'ll engage in important client-facing activities, including proof-of-concepts to demonstrate the value of our solutions.',
            'Team Management: You\'ll lead a team of developer, ensuring effective collaboration and productivity.'
        ],
        summary: 'Overall, your role is crucial in ensuring that our solutions meet client needs efficiently and effectively.'
    }
};

export default async function CareerDetailPage({ params }) {
    const { id } = await params;
    const job = jobData[id];

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <main className={styles.main}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div className={styles.headerLeft}>
                            <Link href="/careers" className={styles.backButton}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className={styles.title}>{job.title}</h1>
                        </div>
                        <div className={styles.headerRight}>
                            <h2 className={styles.jobDescriptionTitle}>Job Description</h2>
                            <div className={styles.jobInfo}>
                                <p><strong>Position:</strong> {job.position}</p>
                                <p><strong>Qualification:</strong> {job.qualification}</p>
                                <p><strong>Experience required:</strong> {job.experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentGrid}>
                        {/* Left Column - Job Details */}
                        <div className={styles.jobDetails}>
                            <div className={styles.detailsCard}>
                                <h3 className={styles.detailsTitle}>JD: {job.position}</h3>

                                <ol className={styles.responsibilitiesList}>
                                    {job.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ol>

                                <p className={styles.summary}>{job.summary}</p>
                            </div>
                        </div>

                        {/* Right Column - Application Form */}
                        <div className={styles.applicationForm}>
                            <form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="fullName">Full Name*</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number*</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="city">City*</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="resume" className={styles.fileLabel}>
                                        Choose File
                                    </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        className={styles.fileInput}
                                    />
                                    <p className={styles.fileHint}>Please upload a pdf or doc file</p>
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.captchaGroup}>
                                        <input
                                            type="checkbox"
                                            id="captcha"
                                            name="captcha"
                                            required
                                        />
                                        <label htmlFor="captcha">Captcha</label>
                                    </div>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Apply Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
