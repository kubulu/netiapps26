import styles from './SingleText.module.scss';

const defaultData = {
    title: "Data, Analytics &\nAI Enablement",
    description: "We help organizations become data-driven with advanced analytics and AI solutions.",
    items: [
        "Data strategy and governance",
        "Business intelligence and dashboards",
        "AI and machine learning solutions",
        "Predictive analytics and insights"
    ]
};

export default function SingleText({ data = defaultData }) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className={styles.leftContent}>
                            <h2 className={styles.title}>{data.title}</h2>
                            <p className={styles.description}>{data.description}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.rightContent}>
                            <ul className={styles.itemList}>
                                {data.items.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        {item}
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
