import styles from './WhyChoose.module.scss';

export default function WhyChoose(data: any) {
    const points = [
        "Strategy-led, execution-focused approach",
        "Deep expertise in web, mobile, AI, and automation",
        "Enterprise-grade delivery standards",
        "Measurable ROI and business impact"
    ];

    return (
        <section className={styles.section} style={{ backgroundImage: "url('/images/whychoose.png')" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-8">
                        <div className={styles.content}>
                            <h2 className={styles.title}>{data.data.title}</h2>
                            <ul className={styles.list}>
                                {data.data.list.map((point: any, index: any) => (
                                    <li key={index} className={styles.listItem}>
                                        {point.items}
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

