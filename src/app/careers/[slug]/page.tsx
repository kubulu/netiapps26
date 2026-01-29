import Link from 'next/link';
import styles from './page.module.scss';
import { ApiService } from '@/services/api.service';
import CareerApplyForm from '../../../components/CareerApplyForm/CareerApplyForm';

export default async function CareerDetailPage({ params, }: { params: { slug: string }; }) {
    const baseUrl = new ApiService();
    const { slug } = await params;

    let Jobs: any[] = [];

    try {
        const resJobs = await fetch(
            baseUrl.getBaseUrl() + `wp-json/wp/v2/careerslist?slug=${slug}`,
            { cache: 'no-store' }
        );

        Jobs = await resJobs.json();
    } catch (error) {
        console.error('Error fetching Jobs:', error);
    }

    if (!Jobs?.length || !Jobs[0]?.acf) {
        return (
            <main className={styles.emptyState}>
                <h2>Content not available</h2>
                <p>Data is not available in your CMS for this service.</p>
            </main>
        );
    }

    const acf = Jobs[0];

    console.log('acfff',acf);

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
                            <h1 className={styles.title}>{acf?.acf.title}</h1>
                        </div>
                        <div className={styles.headerRight}>
                            <h2 className={styles.jobDescriptionTitle}>Job Description</h2>
                            <div className={styles.jobInfo}>
                                <p><strong>Position:</strong> {acf?.acf.position}</p>
                                <p><strong>Qualification:</strong> {acf?.acf.qualification}</p>
                                <p><strong>Experience required:</strong> {acf?.acf.experience}</p>
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
                                <h3 className={styles.detailsTitle}>JD: {acf?.acf.position}</h3>
                                <div dangerouslySetInnerHTML={{__html: acf?.acf.responsibilities}}/>
                                <p className={styles.summary}>{acf?.acf.summary}</p>
                            </div>
                        </div>
                       
                        {/* Right Column - Application Form */}
                        <div className={styles.applicationForm}>
                        <CareerApplyForm role={acf?.acf.position} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
