import { Inria_Sans } from 'next/font/google';
import styles from './ServiceIntroduction.module.scss';

interface ServiceIntroductionProps {
    title: string;
    description: string;
    longDescription?: string;
}

export default function ServiceIntroduction(intro: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <h2 className={styles.title}>
                            {intro.intro.title}
                        </h2>
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.descriptionCard}>
                            <div className={styles.description}>
                               <div dangerouslySetInnerHTML={{__html: intro.intro.description}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
