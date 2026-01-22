import styles from './ServiceDualList.module.scss';

export default function ServiceDualList(data: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.mainTitle}>{data.data.title}</h2>

                <div className="row g-5">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <div className={styles.column}>
                            <h3 className={styles.colTitle}>{data.data.left_section.title}</h3>
                            <p className={styles.colDesc}>{data.data.left_section.description}</p>

                            <ul className={styles.itemList}>
                                {data.data.left_section.items.map((item: any, index: any) => (
                                    <li key={index} className={styles.item}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-6">
                        <div className={styles.column}>
                            <h3 className={styles.colTitle}>{data.data.right_section.title}</h3>
                            <p className={styles.colDesc}>{data.data.right_section.description}</p>

                            <ul className={styles.itemList}>
                                {data.data.right_section.items.map((item: any, index: any) => (
                                    <li key={index} className={styles.item}>
                                        {item.name}
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

