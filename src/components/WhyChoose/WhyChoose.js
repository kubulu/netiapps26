import styles from './WhyChoose.module.scss';

export default function WhyChoose() {
    const points = [
        "Strategy-led, execution-focused approach",
        "Deep expertise in web, mobile, AI, and automation",
        "Enterprise-grade delivery standards",
        "Measurable ROI and business impact"
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-8">
                        <div className={styles.content}>
                            <h2 className={styles.title}>Why Choose Us</h2>
                            <ul className={styles.list}>
                                {points.map((point, index) => (
                                    <li key={index} className={styles.listItem}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
