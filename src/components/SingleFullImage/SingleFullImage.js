import Image from 'next/image';
import styles from './SingleFullImage.module.scss';

export default function SingleFullImage({ imageSrc = '/images/singlefullimage.png', alt = 'Full Width Visual' }) {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={alt}
                        width={1400}
                        height={600}
                        className={styles.mainImg}
                    />
                </div>
            </div>
        </section>
    );
}
