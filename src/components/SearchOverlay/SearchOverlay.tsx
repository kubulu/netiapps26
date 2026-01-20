import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SearchOverlay.module.scss';
import { X } from 'lucide-react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
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

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            onClose();
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
