import styles from './WhatWeDo.module.scss';

export default function WhatWeDo() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>What We Do</h2>
                <div className={styles.card}>
                    <div className="row g-0">
                        <div className="col-md-6">
                            <div className={styles.contentItem}>
                                <p>
                                    We help businesses move from where they are today to where
                                    they need to be tomorrow—with clarity, confidence, and a
                                    clear execution roadmap.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`${styles.contentItem} ${styles.borderLeft}`}>
                                <p>
                                    Our consulting approach combines business insight, technology
                                    expertise, and AI-driven thinking to deliver transformation
                                    that works in the real world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

