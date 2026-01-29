import Image from "next/image";
import styles from "./ExcellenceSection.module.scss";

export default function ExcellenceSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.textCol}>
                        <h2 className={styles.title}>
                            20+ Years of<br />
                            Experience. One<br />
                            Goal: Your Digital<br />
                            Success
                        </h2>
                        <p className={styles.description}>
                            Driving efficiency, scalability, and growth through cutting-edge
                            digital solutions tailored to your business needs.
                        </p>
                    </div>
                    <div className={styles.imageCol}>
                        <Image
                            src="/images/22years.svg"
                            alt="20 Years of Excellence Badge"
                            width={350}
                            height={350}
                            className={styles.badgeImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
