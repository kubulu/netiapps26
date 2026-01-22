import styles from './WhatWeDo.module.scss';

export default function WhatWeDo(content: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>{content.content.title}</h2>
                <div className={styles.card}>
                    <div className="row g-0">
                        <div className="col-md-6">
                            <div className={styles.contentItem}>
                               <div dangerouslySetInnerHTML={{__html: content.content.left}} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`${styles.contentItem} ${styles.borderLeft}`}>
                                <div dangerouslySetInnerHTML={{__html: content.content.right}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

