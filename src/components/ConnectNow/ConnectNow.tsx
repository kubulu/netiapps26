import Link from 'next/link';
import styles from './ConnectNow.module.scss';

export default function ConnectNow(connect: any) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div dangerouslySetInnerHTML={{__html: connect.connect.text}}/>
                    <Link href={connect.connect.link} className={styles.btn}>
                        {connect.connect.button_name}
                    </Link>
                </div>
            </div>
        </section>
    );
}

