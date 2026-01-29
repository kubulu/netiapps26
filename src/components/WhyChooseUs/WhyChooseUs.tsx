import Image from "next/image";
import styles from "./WhyChooseUs.module.scss";

export default function WhyChooseUs() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.imageCol}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/whychooseus.png"
                                alt="Why Choose Us"
                                fill
                                quality={90}
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.textCol}>
                        <h2 className={styles.title}>Why Us</h2>
                        <p className={styles.text}>
                            NetiApps stands out for its precision and expertise, backed by a
                            proven track record of delivering successful digital products across
                            diverse industries. From concept to deployment, our team works
                            closely with clients to create intuitive, creative, and
                            high-performance solutions. With decades of development experience,
                            we consistently deliver software on time and within budget, ensuring
                            maximum value without compromising quality—whether the project is
                            simple or complex.
                        </p>
                        <p className={styles.text}>
                            Above all, our customer-first mindset drives everything we do. Our
                            support teams bring deep domain knowledge and a strong focus on
                            solving real business problems, ensuring every solution aligns with
                            your goals and exceeds expectations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
