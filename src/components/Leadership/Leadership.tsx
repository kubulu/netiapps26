import Image from "next/image";
import styles from "./Leadership.module.scss";

export default function Leadership() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.imageCol}>
                        <div className={styles.imageContainer}>
                            {/* Replace with actual leadership image name */}
                            <Image
                                src="/images/manoj.png"
                                alt="Leadership Vision"
                                fill
                                quality={90}
                                className={styles.image}
                            />
                        </div>
                    </div>
                    <div className={styles.textCol}>
                        <h2 className={styles.title}>Leadership Vision</h2>
                        <div className={styles.quote}>
                            <p>
                                “At NetiApps, we aim to be a key player in the software
                                development industry whilst also delivering unforgettable memorable
                                experiences to our clientele. Our successes are not only a result
                                of the quality of work, but also because of our attitude,
                                approach, and the way in which we prioritize our clients and
                                their needs over everything.”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
