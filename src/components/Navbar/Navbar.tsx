"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import SearchOverlay from '@/components/SearchOverlay';
import { ChevronDown } from 'lucide-react';

// Navigation data structure

export default function Navbar(nav: any) {
    // console.log('Nav',nav);
    const { language, setLanguage, translate } = useLanguage();
    const [translatedNav, setTranslatedNav] = useState<any>(null);
    const navigationData = translatedNav || nav.nav.navigation_data;

    useEffect(() => {
        async function translateNav() {
          if (!navigationData) return;
      
          const translated = JSON.parse(JSON.stringify(navigationData));
      
          translated.home.name = await translate(navigationData.home.name);
          translated.about.title = await translate(navigationData.about.title);
          translated.services.title = await translate(navigationData.services.title);
          translated.solutions.title = await translate(navigationData.solutions.title);
          translated.career.name = await translate(navigationData.career.name);
          translated.contact.name = await translate(navigationData.contact.name);
      
          for (const item of translated.about.menu_items) {
            item.name = await translate(item.name);
          }
      
          setTranslatedNav(translated);
        }
      
        translateNav();
      }, [language]);
      

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeServiceTab, setActiveServiceTab] = useState(0);
    const [activeSolutionTab, setActiveSolutionTab] = useState(0);

    const handleMouseEnter = (menu: string) => {
        setActiveDropdown(menu);
        // Reset tab to first item when opening dropdown
        if (menu === 'services') setActiveServiceTab(0);
        if (menu === 'solutions') setActiveSolutionTab(0);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
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

                    {/* Center Links Section */}
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
                    <div className={styles.languageSelector}>
                        <Image src="/images/solar_global-outline.svg" alt="Global" width={20} height={20} />

                        <select name="language" className={styles.language}
                        value={language}
                        onChange={(e) => {
                            const selectedLang = e.target.value as any;
                            setLanguage(selectedLang);

                            // Force refresh after language change
                            window.location.reload();
                        }}
                        >
                            <option value="en">US-EN</option>
                            {/* <option value="ta">தமிழ்</option>
                            <option value="hi">हिन्दी</option>
                            <option value="fr">FR</option> */}
                        </select>
                        </div>


                        <Link href={navigationData.contact.link} className={styles.contactBtn}>
                            {navigationData.contact.name}
                        </Link>

                        <button className={styles.searchBtn} onClick={() => setIsSearchOpen(true)}>
                            <Image src="/images/search.svg" alt="Search" width={18} height={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Services Mega Menu Dropdown */}
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
                                  <a href={`/services/${category.link}`}> {category.title} </a>
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={`/services/${navigationData.services.mega_menu[activeServiceTab].link}`}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.services.mega_menu[activeServiceTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.services.mega_menu[activeServiceTab].menu_items.map((item: any, idx: any) => (
                                    <li key={idx}><a href={`/services/${item.link}`}>{item.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Solutions Mega Menu Dropdown */}
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
                                   <a href={`/solutions/${category.link}`}> {category.title} </a>
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={`/solutions/${navigationData.solutions.mega_menu[activeSolutionTab].link}`}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.solutions.mega_menu[activeSolutionTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.solutions.mega_menu[activeSolutionTab].menu_items.map((item: any, idx: any) => (
                                    <li key={idx}><a href={`/solutions/${item.link}`}>{item.name}</a></li>
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
