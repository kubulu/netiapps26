"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import SearchOverlay from '@/components/SearchOverlay';
import { ChevronDown } from 'lucide-react';

// Navigation data structure
const navigationData = {
    about: {
        title: 'About',
        items: [
            { label: 'About NetiApps', href: '/about' },
            { label: 'Engagement Model', href: '/about/engagement-model' },
            { label: 'Development Process', href: '/about/development-process' },
            { label: 'Clients', href: '/about/clients' },
            { label: 'Terms of Use', href: '/about/terms-of-use' },
            { label: 'Privacy Policy', href: '/about/privacy-policy' },
        ]
    },
    services: {
        title: 'Services',
        megaMenu: [
            {
                title: 'Digital Strategy and Consulting',
                href: '/services/digital-strategy',
                items: [
                    'Digital Transformation Consulting',
                    'Product & Platform Strategy',
                    'Business Process Analysis & Optimization',
                    'Technology Road mapping',
                    'AI Adoption & Readiness Assessment'
                ]
            },
            {
                title: 'Web Development Services',
                href: '/services/web-development',
                items: [
                    'Corporate & Enterprise Websites',
                    'Custom Web Application Development',
                    'CMS Development (WordPress, Headless CMS)',
                    'Progressive Web Apps (PWA)',
                    'Portal & Dashboard Development',
                    'Website Revamp & Performance Optimization'
                ]
            },
            {
                title: 'Mobile App Development',
                href: '/services/mobile-development',
                items: [
                    'Native iOS & Android Apps',
                    'Cross-Platform Apps (Flutter, React Native)',
                    'Enterprise Mobility Solutions',
                    'App Modernization & Migration',
                    'UI/UX-Focused App Design'
                ]
            },
            {
                title: 'Custom Software Development',
                href: '/services/custom-software',
                items: [
                    'Enterprise Software Solutions',
                    'SaaS Product Development',
                    'Microservices Architecture',
                    'API Development & Integration',
                    'Legacy System Modernization'
                ]
            },
            {
                title: 'Cloud and DevOps Services',
                href: '/services/cloud-devops',
                items: [
                    'Cloud Migration (AWS, Azure, GCP)',
                    'Cloud-Native Application Development',
                    'DevOps & CI/CD Implementation',
                    'Security & Compliance'
                ]
            },
            {
                title: 'UI/UX Experience Design',
                href: '/services/ui-ux-design',
                items: [
                    'User Experience (UX) Strategy',
                    'User Interface (UI) Design',
                    'Design Systems',
                    'Prototyping & Usability Testing',
                    'Enterprise UX Optimization'
                ]
            },
            {
                title: 'Integration and API Services',
                href: '/services/integration-api',
                items: [
                    'Third-Party System Integration',
                    'ERP, CRM & HRMS Integration',
                    'Payment, Logistics & CRM APIs',
                    'Middleware & Integration Platforms'
                ]
            },
            {
                title: 'Maintenance and Managed Services',
                href: '/services/maintenance',
                items: [
                    'Application Support & Maintenance',
                    'Performance Monitoring',
                    'Security Updates & Patching',
                    'SLA-Based Managed Services'
                ]
            }
        ]
    },
    solutions: {
        title: 'Solutions',
        megaMenu: [
            {
                title: 'AI and Intelligent Solutions',
                href: '/solutions/ai-intelligent',
                items: [
                    'AI-Driven Business Automation',
                    'Chatbots & Virtual Assistants',
                    'Predictive Analytics & BI',
                    'Machine Learning Models',
                    'Recommendation Engines',
                    'Computer Vision & NLP Solutions'
                ]
            },
            {
                title: 'Data Analytics and BI',
                href: '/solutions/data-analytics',
                items: [
                    'Data Engineering & Warehousing',
                    'Business Intelligence Dashboards',
                    'Data Visualization',
                    'Real-Time Reporting',
                    'AI-Driven Insights'
                ]
            },
            {
                title: 'E-Commerce Solutions',
                href: '/solutions/ecommerce',
                items: [
                    'Custom E-Commerce Development',
                    'B2B & B2C Commerce Platforms',
                    'Marketplace Development',
                    'Payment Gateway & ERP Integration',
                    'Subscription & SaaS Commerce',
                    'E-Commerce Automation & Analytics'
                ]
            },
            {
                title: 'Business Process Automation',
                href: '/solutions/business-automation',
                items: [
                    'Workflow Automation',
                    'Robotic Process Automation (RPA)',
                    'CRM & ERP Automation',
                    'Document & Data Automation',
                    'AI-Powered Decision Systems'
                ]
            }
        ]
    }
};

export default function Navbar() {
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
                            <li>
                                <Link href="/">Home</Link>
                            </li>

                            {/* About Dropdown */}
                            <li
                                className={styles.hasDropdown}
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.dropdownTrigger}>
                                    About <ChevronDown size={16} />
                                </span>
                                {activeDropdown === 'about' && (
                                    <div className={styles.dropdown}>
                                        <ul>
                                            {navigationData.about.items.map((item, index) => (
                                                <li key={index}>
                                                    <Link href={item.href}>{item.label}</Link>
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
                                    Services <ChevronDown size={16} />
                                </span>
                            </li>

                            {/* Solutions Mega Menu */}
                            <li
                                className={styles.hasDropdown}
                                onMouseEnter={() => handleMouseEnter('solutions')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={styles.dropdownTrigger}>
                                    Solutions <ChevronDown size={16} />
                                </span>
                            </li>

                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
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
                            {navigationData.services.megaMenu.map((category, index) => (
                                <button
                                    key={index}
                                    className={`${styles.tab} ${activeServiceTab === index ? styles.activeTab : ''}`}
                                    onMouseEnter={() => setActiveServiceTab(index)}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={navigationData.services.megaMenu[activeServiceTab].href}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.services.megaMenu[activeServiceTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.services.megaMenu[activeServiceTab].items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
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
                            {navigationData.solutions.megaMenu.map((category, index) => (
                                <button
                                    key={index}
                                    className={`${styles.tab} ${activeSolutionTab === index ? styles.activeTab : ''}`}
                                    onMouseEnter={() => setActiveSolutionTab(index)}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className={styles.tabContent}>
                            <Link
                                href={navigationData.solutions.megaMenu[activeSolutionTab].href}
                                className={styles.tabContentTitle}
                            >
                                {navigationData.solutions.megaMenu[activeSolutionTab].title}
                            </Link>
                            <ul className={styles.tabContentList}>
                                {navigationData.solutions.megaMenu[activeSolutionTab].items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
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
