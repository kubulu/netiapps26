import Link from 'next/link';
import styles from './ConnectNow.module.scss';

export default function ConnectNow() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>
                        Ready to transform your <br /> strategy into action?
                    </h2>
                    <p className={styles.description}>
                        Talk to our digital consultants and discover how AI-driven digital solutions can <br /> accelerate your business growth.
                    </p>
                    <Link href="/contact" className={styles.btn}>
                        Connect Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
