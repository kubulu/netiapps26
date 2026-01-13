import { useEffect } from 'react';
import Image from 'next/image';
import styles from './SearchOverlay.module.scss';
import { X } from 'lucide-react';

export default function SearchOverlay({ isOpen, onClose }) {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={onClose}
        >
            <div
                className="container h-100 d-flex flex-column justify-content-center position-relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={32} color="white" strokeWidth={1} />
                </button>

                <div className={styles.searchWrapper}>
                    <div className={styles.inputGroup}>
                        <Image
                            src="/images/search.svg"
                            alt="Search"
                            width={24}
                            height={24}
                            className={styles.searchIcon}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="What you are looking for?"
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
