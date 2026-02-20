"use client";

import { cachedTranslate, useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import SearchOverlay from '@/components/SearchOverlay';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { Language } from "@/types/language";
import { getMediaUrl } from "@/lib/media";

// Navigation data structure

export default function Navbar(nav: any) {
    // console.log('Nav',nav);
    const { language, setLanguage, translate } = useLanguage();
    const [translatedNav, setTranslatedNav] = useState<any>(null);

    // const originalNav = nav.nav.navigation_data;
    const [originalNav] = useState(nav.nav.navigation_data);

    const navigationData = translatedNav || originalNav;

    useEffect(() => {
        async function translateNav() {
            if (!originalNav) return;

            if (language.toUpperCase() === "EN") {
                setTranslatedNav(null);
                return;
            }

            const translated = JSON.parse(JSON.stringify(originalNav));
            const tasks: Promise<any>[] = [];

            const t = (text: string) =>
                cachedTranslate(text, language, translate);

            tasks.push(
                t(originalNav.home.name).then((r: any) => translated.home.name = r),
                t(originalNav.about.title).then((r: any) => translated.about.title = r),
                t(originalNav.services.title).then((r: any) => translated.services.title = r),
                t(originalNav.solutions.title).then((r: any) => translated.solutions.title = r),
                t(originalNav.career.name).then((r: any) => translated.career.name = r),
                t(originalNav.contact.name).then((r: any) => translated.contact.name = r)
            );

            translated.about.menu_items.forEach((item: any) => {
                tasks.push(t(item.name).then((r: any) => item.name = r));
            });

            translated.services.mega_menu.forEach((cat: any) => {
                tasks.push(t(cat.title).then((r: any) => cat.title = r));
                cat.menu_items.forEach((item: any) => {
                    tasks.push(t(item.name).then((r: any) => item.name = r));
                });
            });

            translated.solutions.mega_menu.forEach((cat: any) => {
                tasks.push(t(cat.title).then((r: any) => cat.title = r));
                cat.menu_items.forEach((item: any) => {
                    tasks.push(t(item.name).then((r: any) => item.name = r));
                });
            });

            await Promise.all(tasks);
            setTranslatedNav(translated);
        }

        translateNav();
    }, [language]);


    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeServiceTab, setActiveServiceTab] = useState(0);
    const [activeSolutionTab, setActiveSolutionTab] = useState(0);

    // Mobile Menu State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

    // Language Dropdown State
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    const languages: { code: Language; name: string; countryCode: string }[] = [
        { code: "EN", name: "English", countryCode: "us" },
        { code: "FR", name: "French", countryCode: "fr" },
        { code: "DE", name: "German", countryCode: "de" },
        { code: "NL", name: "Dutch", countryCode: "nl" },
        { code: "PT", name: "Portuguese", countryCode: "pt" },
        { code: "IT", name: "Italian", countryCode: "it" },
        { code: "ES", name: "Spanish", countryCode: "es" },
        { code: "PL", name: "Polish", countryCode: "pl" },
        { code: "SE", name: "Swedish", countryCode: "se" },
        { code: "FI", name: "Finnish", countryCode: "fi" },
    ];

    // const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const selectedLanguage = languages.find((l) => l.code === language) || languages[0];


    const handleMouseEnter = (menu: string) => {
        if (window.innerWidth > 992) {
            setActiveDropdown(menu);
            if (menu === 'services') setActiveServiceTab(0);
            if (menu === 'solutions') setActiveSolutionTab(0);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 992) {
            setActiveDropdown(null);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setExpandedMobileMenu(null); // Reset expanded on toggle
    };

    const toggleMobileAccordion = (menu: string) => {
        setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className="container d-flex align-items-center justify-content-between">
                    {/* Logo Section */}
                    <div className={styles.logoSection}>
                        <Link href={nav.nav.logo.link} className={styles.logoLink}>
                            <Image
                                src={nav.nav.logo.img}
                                alt="netiapps logo"
                                width={180}
                                height={60}
                                className={styles.logoImage}
                            />
                        </Link>
                    </div>

                    {/* Center Links Section (Desktop) */}
                    <div className={styles.navLinksWrapper}>
                        <ul className={styles.navLinks}>
                            <li>
                                <Link href={navigationData.home.link}>{navigationData.home.name}</Link>
                            </li>

                            {/* About Dropdown */}
                            <li
                                className={styles.hasDropdown}
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.dropdownTrigger}>
                                    {navigationData.about.title} <ChevronDown size={16} />
                                </span>
                                {activeDropdown === 'about' && (
                                    <div className={styles.dropdown}>
                                        <ul>
                                            {navigationData.about.menu_items.map((item: any, index: any) => (
                                                <li key={index}>
                                                    <Link href={item.link}>{item.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Services Mega Menu */}
                            <li
                                className={styles.hasDropdown}
                                onMouseEnter={() => handleMouseEnter('services')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.dropdownTrigger}>
                                    {navigationData.services.title} <ChevronDown size={16} />
                                </span>
                            </li>

                            {/* Solutions Mega Menu */}
                            <li
                                className={styles.hasDropdown}
                                onMouseEnter={() => handleMouseEnter('solutions')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.dropdownTrigger}>
                                    {navigationData.solutions.title} <ChevronDown size={16} />
                                </span>
                            </li>

                            <li>
                                <Link href={navigationData.career.link}>{navigationData.career.name}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section Actions */}
                    <div className={styles.actionsSection}>
                        <div
                            className={styles.languageSelector}
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            ref={(node) => {
                                // Close dropdown when clicking outside logic could be added here or via a global click listener if needed
                                // For simplicity we toggle on click
                            }}
                        >
                            <span className="me-2 d-flex align-items-center">
                                <img
                                    src={`https://flagcdn.com/w40/${selectedLanguage.countryCode}.png`}
                                    srcSet={`https://flagcdn.com/w80/${selectedLanguage.countryCode}.png 2x`}
                                    width="20"
                                    alt={selectedLanguage.name}
                                    style={{ borderRadius: '2px', objectFit: 'cover' }}
                                />
                            </span>
                            <span className="ms-1">{selectedLanguage.code}</span>
                            <ChevronDown size={12} className="ms-1" />

                            <div className={`${styles.languageDropdown} ${isLangDropdownOpen ? styles.open : ''}`}>
                                <ul>
                                    {languages.map((lang) => (
                                        <li
                                            key={lang.code}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // setSelectedLanguage(lang);
                                                setLanguage(lang.code);
                                                setIsLangDropdownOpen(false);
                                            }}
                                        >
                                            <span className="me-2 d-flex align-items-center">
                                                <img
                                                    src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                                    srcSet={`https://flagcdn.com/w80/${lang.countryCode}.png 2x`}
                                                    width="20"
                                                    alt={lang.name}
                                                    style={{ borderRadius: '2px', objectFit: 'cover' }}
                                                />
                                            </span>
                                            {lang.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <Link href={navigationData.contact.link} className={styles.contactBtn}>
                            <span className="d-none d-lg-block">{navigationData.contact.name}</span>
                            <span className="d-lg-none"><Phone size={20} /></span>
                        </Link>

                        <button className={styles.searchBtn} onClick={() => setIsSearchOpen(true)}>
                            <Image src={getMediaUrl("/images/search.svg")} alt="Search" width={22} height={22} />
                        </button>

                        {/* Mobile Hamburger Toggle */}
                        <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? <X size={24} color="#1a1a1a" /> : <Menu size={24} color="#1a1a1a" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
                <div className="container">
                    <ul className={styles.mobileNavList}>
                        {/* Mobile Language Selector */}
                        <li className={styles.mobileNavItem}>
                            <div className={styles.mobileNavHeader} onClick={() => toggleMobileAccordion('language')}>
                                <div className="d-flex align-items-center">
                                    <span className="me-2 d-flex align-items-center">
                                        <img
                                            src={`https://flagcdn.com/w40/${selectedLanguage.countryCode}.png`}
                                            srcSet={`https://flagcdn.com/w80/${selectedLanguage.countryCode}.png 2x`}
                                            width="20"
                                            alt={selectedLanguage.name}
                                            style={{ borderRadius: '2px', objectFit: 'cover' }}
                                        />
                                    </span>
                                    <span>{selectedLanguage.name}</span>
                                </div>
                                <ChevronDown size={16} className={expandedMobileMenu === 'language' ? styles.rotate : ''} />
                            </div>
                            <div className={`${styles.mobileSubMenu} ${expandedMobileMenu === 'language' ? styles.open : ''}`}>
                                <ul>
                                    {languages.map((lang) => (
                                        <li
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                toggleMobileMenu();
                                            }}
                                            style={{ cursor: 'pointer', padding: '0.8rem 0' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 d-flex align-items-center">
                                                    <img
                                                        src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                                        srcSet={`https://flagcdn.com/w80/${lang.countryCode}.png 2x`}
                                                        width="20"
                                                        alt={lang.name}
                                                        style={{ borderRadius: '2px', objectFit: 'cover' }}
                                                    />
                                                </span>
                                                <span style={{ color: lang.code === selectedLanguage.code ? '#E30613' : '#555', fontSize: '1rem' }}>
                                                    {lang.name}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li>
                            <Link href={navigationData.home.link} onClick={toggleMobileMenu}>
                                {navigationData.home.name}
                            </Link>
                        </li>

                        {/* Mobile About */}
                        <li className={styles.mobileNavItem}>
                            <div className={styles.mobileNavHeader} onClick={() => toggleMobileAccordion('about')}>
                                {navigationData.about.title}
                                <ChevronDown size={16} className={expandedMobileMenu === 'about' ? styles.rotate : ''} />
                            </div>
                            <div className={`${styles.mobileSubMenu} ${expandedMobileMenu === 'about' ? styles.open : ''}`}>
                                <ul>
                                    {navigationData.about.menu_items.map((item: any, index: any) => (
                                        <li key={index}>
                                            <Link href={item.link} onClick={toggleMobileMenu}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        {/* Mobile Services */}
                        <li className={styles.mobileNavItem}>
                            <div className={styles.mobileNavHeader} onClick={() => toggleMobileAccordion('services')}>
                                {navigationData.services.title}
                                <ChevronDown size={16} className={expandedMobileMenu === 'services' ? styles.rotate : ''} />
                            </div>
                            <div className={`${styles.mobileSubMenu} ${expandedMobileMenu === 'services' ? styles.open : ''}`}>
                                {navigationData.services.mega_menu.map((category: any, idx: number) => (
                                    <div key={idx} className="mb-3">
                                        <strong className="d-block text-dark mb-2">{category.title}</strong>
                                        <ul className="list-unstyled ps-3">
                                            {category.menu_items.map((item: any, i: number) => (
                                                <li key={i} className="mb-1">
                                                    <Link href={item.link || '#'} onClick={toggleMobileMenu} className="text-secondary text-decoration-none">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </li>

                        {/* Mobile Solutions */}
                        <li className={styles.mobileNavItem}>
                            <div className={styles.mobileNavHeader} onClick={() => toggleMobileAccordion('solutions')}>
                                {navigationData.solutions.title}
                                <ChevronDown size={16} className={expandedMobileMenu === 'solutions' ? styles.rotate : ''} />
                            </div>
                            <div className={`${styles.mobileSubMenu} ${expandedMobileMenu === 'solutions' ? styles.open : ''}`}>
                                {navigationData.solutions.mega_menu.map((category: any, idx: number) => (
                                    <div key={idx} className="mb-3">
                                        <strong className="d-block text-dark mb-2">{category.title}</strong>
                                        <ul className="list-unstyled ps-3">
                                            {category.menu_items.map((item: any, i: number) => (
                                                <li key={i} className="mb-1">
                                                    <Link href={item.link || '#'} onClick={toggleMobileMenu} className="text-secondary text-decoration-none">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </li>

                        <li>
                            <Link href={navigationData.career.link} onClick={toggleMobileMenu}>
                                {navigationData.career.name}
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>

            {/* Desktop Services Mega Menu Dropdown */}
            {activeDropdown === 'services' && (
                <div
                    className={`${styles.megaMenu} ${styles.servicesMenu}`}
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.tabContainer}>
                        {/* Left Tabs */}
                        <div className={styles.tabList}>
                            {navigationData.services.mega_menu.map((category: any, index: any) => (
                                <button
                                    key={index}
                                    className={`${styles.tab} ${activeServiceTab === index ? styles.activeTab : ''}`}
                                    onMouseEnter={() => setActiveServiceTab(index)}
                                >
                                    <a href={category.link}> {category.title} </a>
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={navigationData.services.mega_menu[activeServiceTab].link}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.services.mega_menu[activeServiceTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.services.mega_menu[activeServiceTab].menu_items.map((item: any, idx: any) => (
                                    <li key={idx}><a href={item.link}>{item.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Solutions Mega Menu Dropdown */}
            {activeDropdown === 'solutions' && (
                <div
                    className={`${styles.megaMenu} ${styles.solutionsMenu}`}
                    onMouseEnter={() => handleMouseEnter('solutions')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.tabContainer}>
                        {/* Left Tabs */}
                        <div className={styles.tabList}>
                            {navigationData.solutions.mega_menu.map((category: any, index: any) => (
                                <button
                                    key={index}
                                    className={`${styles.tab} ${activeSolutionTab === index ? styles.activeTab : ''}`}
                                    onMouseEnter={() => setActiveSolutionTab(index)}
                                >
                                    <a href={category.link}> {category.title} </a>
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={navigationData.solutions.mega_menu[activeSolutionTab].link}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.solutions.mega_menu[activeSolutionTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.solutions.mega_menu[activeSolutionTab].menu_items.map((item: any, idx: any) => (
                                    <li key={idx}><a href={item.link}>{item.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
