import styles from './ServiceDualList.module.scss';

interface SectionData {
    title: string;
    desc: string;
    items: string[];
}

interface ServiceDualListData {
    mainTitle: string;
    leftSection: SectionData;
    rightSection: SectionData;
}

interface ServiceDualListProps {
    data?: ServiceDualListData;
}

const defaultData: ServiceDualListData = {
    mainTitle: "Our Digital Transformation Services",
    leftSection: {
        title: "Business Process\nTransformation",
        desc: "We streamline and automate core business processes to improve agility and productivity.",
        items: [
            "Process re-engineering",
            "Workflow automation",
            "ERP and CRM optimization",
            "Cost and efficiency optimization"
        ]
    },
    rightSection: {
        title: "Technology\nModernization",
        desc: "We modernize legacy systems and build scalable, secure digital platforms.",
        items: [
            "Cloud migration and cloud-native solutions",
            "Application modernization",
            "API and microservices architecture",
            "Cybersecurity and compliance"
        ]
    }
};

export default function ServiceDualList({ data = defaultData }: ServiceDualListProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.mainTitle}>{data.mainTitle}</h2>

                <div className="row g-5">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <div className={styles.column}>
                            <h3 className={styles.colTitle}>{data.leftSection.title}</h3>
                            <p className={styles.colDesc}>{data.leftSection.desc}</p>

                            <ul className={styles.itemList}>
                                {data.leftSection.items.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-6">
                        <div className={styles.column}>
                            <h3 className={styles.colTitle}>{data.rightSection.title}</h3>
                            <p className={styles.colDesc}>{data.rightSection.desc}</p>

                            <ul className={styles.itemList}>
                                {data.rightSection.items.map((item, index) => (
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

