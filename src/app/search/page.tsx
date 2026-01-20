"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import InnerPageBanner from '@/components/InnerPageBanner'; // Assuming this component exists
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import styles from './page.module.scss';
import Navbar from '@/components/Navbar/Navbar'; // Assuming we might need context or just standard layout

// Mock Data for Search
const SITE_CONTENT = [
    {
        title: "About NetiApps",
        description: "Learn about NetiApps, our vision, mission, and the team driving digital transformation.",
        link: "/about",
        category: "Company"
    },
    {
        title: "Contact Us",
        description: "Get in touch with our team for inquiries, support, or partnership opportunities.",
        link: "/contact",
        category: "Contact"
    },
    {
        title: "Services",
        description: "Explore our wide range of services including Web Development, Mobile Apps, and AI Solutions.",
        link: "/services",
        category: "Services"
    },
    {
        title: "Digital Strategy & Consulting",
        description: "Strategic consulting to help your business navigate the digital landscape.",
        link: "/services/digital-strategy",
        category: "Services"
    },
    {
        title: "Web Development",
        description: "Custom web development services using the latest technologies like Next.js and React.",
        link: "/services/web-development",
        category: "Services"
    },
    {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile application development for iOS and Android.",
        link: "/services/mobile-development",
        category: "Services"
    },
    {
        title: "Our Clients",
        description: "See the trusted companies and partners we have worked with over the years.",
        link: "/about/clients",
        category: "Company"
    },
    {
        title: "Privacy Policy",
        description: "Read our privacy policy to understand how we handle your data.",
        link: "/about/privacy-policy",
        category: "Legal"
    },
    {
        title: "Terms of Use",
        description: "Terms and conditions for using the NetiApps website and services.",
        link: "/about/terms-of-use",
        category: "Legal"
    },
    {
        title: "Careers",
        description: "Join our team! Explore current job openings and career opportunities.",
        link: "/careers",
        category: "Company"
    }
];

function SearchResults() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState(SITE_CONTENT);

    useEffect(() => {
        if (query.trim() === '') {
            setResults(SITE_CONTENT);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = SITE_CONTENT.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)
            );
            setResults(filtered);
        }
    }, [query]);

    // Update local state if URL param changes
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // The effect will handle the filtering based on state 'query'
        // If we wanted to update URL, we would router.push(`?q=${query}`)
    };

    return (
        <main>
            <InnerPageBanner
                tag="Search"
                title={query ? `Results for "${query}"` : "Search Our Site"}
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Search' }
                ]}
                imageSrc="/images/innerbanner.png"
            />

            <section className={styles.container}>
                <div className="container">

                    {/* Search Input Area */}
                    <div className={styles.searchHeader}>
                        <form onSubmit={handleSearch} className={styles.searchBoxWrapper}>
                            <div className={styles.searchInputGroup}>
                                <Search className={styles.searchIcon} size={24} color="#E30613" />
                                <input
                                    type="text"
                                    placeholder="Search services, pages, or topics..."
                                    className={styles.input}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.searchBtn}>Search</button>
                            </div>
                        </form>

                        {query && (
                            <p className={styles.resultsCount}>
                                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                            </p>
                        )}
                    </div>

                    {/* Results List */}
                    <div className={styles.resultsList}>
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <span className={styles.resultCategory}>{item.category}</span>
                                    <h3 className={styles.resultTitle}>
                                        <Link href={item.link}>{item.title}</Link>
                                    </h3>
                                    <p className={styles.resultDescription}>{item.description}</p>
                                    <Link href={item.link} style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1rem', color: '#E30613', fontWeight: 600 }}>
                                        Read More <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                <h3>No results found</h3>
                                <p>Try adjusting your search terms or browse our main menu.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
