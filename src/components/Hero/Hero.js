import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.scss';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container h-100 position-relative">
                <div className="row h-100 align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6">
                        <div className={styles.content}>
                            <h1 className={styles.title}>
                                <strong>Empower</strong> Your<br />
                                <strong>Enterprise</strong> with Next-<br />
                                Gen <strong>Technology</strong>
                            </h1>

                            <Link href="/about" className={styles.ctaBtn}>
                                Read More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="col-lg-6 position-relative h-100 d-none d-lg-block">
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/HERO1.png"
                                alt="Empower Your Enterprise"
                                fill
                                priority
                                className={styles.heroImage}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.badgeWrapper}>
                    <Image
                        src="/images/20YEARS.svg"
                        alt="20 Years of Excellence"
                        width={340}
                        height={140}
                        className={styles.badgeImage}
                    />
                </div>
            </div>
        </section>
    );
}
