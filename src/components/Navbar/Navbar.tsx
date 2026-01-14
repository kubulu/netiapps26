"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import SearchOverlay from '@/components/SearchOverlay';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className={styles.navbar}>
                <div className="container d-flex align-items-center justify-content-between">
                    {/* Logo Section */}
                    <div className={styles.logoSection}>
                        <Link href="/" className={styles.logoLink}>
                            <Image
                                src="/images/logo.svg"
                                alt="netiapps logo"
                                width={180}
                                height={60}
                                className={styles.logoImage}
                            />
                        </Link>
                    </div>

                    {/* Center Links Section */}
                    <div className={styles.navLinksWrapper}>
                        <ul className={styles.navLinks}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/solutions">Solutions</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Right Section Actions */}
                    <div className={styles.actionsSection}>
                        <div className={styles.languageSelector}>
                            <Image src="/images/solar_global-outline.svg" alt="Global" width={20} height={20} />
                            <span className="ms-2">US-EN</span>
                            <Image src="/images/down.svg" alt="Dropdown" width={12} height={12} className="ms-1" />
                        </div>

                        <Link href="/contact" className={styles.contactBtn}>
                            Contact Us
                        </Link>

                        <button className={styles.searchBtn} onClick={() => setIsSearchOpen(true)}>
                            <Image src="/images/search.svg" alt="Search" width={18} height={18} />
                        </button>
                    </div>
                </div>
            </nav>

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
