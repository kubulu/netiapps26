import styles from './ServiceIntroduction.module.scss';

interface ServiceIntroductionProps {
    title: string;
    description: string;
    longDescription?: string;
}

export default function ServiceIntroduction({ title, description, longDescription }: ServiceIntroductionProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <h2 className={styles.title}>
                            {title}
                        </h2>
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.descriptionCard}>
                            <div className={styles.description}>
                                <p>{description}</p>
                                {longDescription && (
                                    <div className={styles.longDesc} dangerouslySetInnerHTML={{ __html: longDescription }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
