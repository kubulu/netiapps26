import styles from './PageBanner.module.scss';
import Link from 'next/link';

interface PageBannerProps {
    title: string;
    subtitle?: string;
    breadcrumb: string;
}

export default function PageBanner({ title, subtitle, breadcrumb }: PageBannerProps) {
    return (
        <section className={styles.banner}>
            <div className="container">
                <div className={styles.content}>
                    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
                        <ol className="breadcrumb mb-2">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{breadcrumb}</li>
                        </ol>
                    </nav>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>
        </section>
    );
}

