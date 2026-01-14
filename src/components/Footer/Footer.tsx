import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                {/* Hire CTA Section */}
                <div className={styles.hireCta}>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
                        <h2 className={styles.hireTitle}>
                            Looking to hire for long-term or short-term assignments?
                        </h2>
                        <Link href="/hire" className={styles.hireBtn}>
                            Hire Now
                        </Link>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className={styles.footerContent}>
                    <div className="row">
                        {/* Services */}
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h3 className={styles.columnTitle}>Services</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="#">Digital Strategy and Consulting</Link></li>
                                <li><Link href="#">Web Development Services</Link></li>
                                <li><Link href="#">Mobile App Development</Link></li>
                                <li><Link href="#">Custom Software Development</Link></li>
                                <li><Link href="#">Cloud and DevOps Services</Link></li>
                                <li><Link href="#">UI/UX Experience Design</Link></li>
                                <li><Link href="#">Integration and API Services</Link></li>
                                <li><Link href="#">Maintenance and Managed Services</Link></li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h3 className={styles.columnTitle}>Solutions</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="#">AI and Intelligent Solutions</Link></li>
                                <li><Link href="#">Data Analytics and BI</Link></li>
                                <li><Link href="#">E-Commerce Solutions</Link></li>
                                <li><Link href="#">Business Process Automation</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h3 className={styles.columnTitle}>Company</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="#">About NetiApps</Link></li>
                                <li><Link href="#">Engagement model</Link></li>
                                <li><Link href="#">Development Process</Link></li>
                                <li><Link href="#">Clients</Link></li>
                                <li><Link href="#">Terms of Use</Link></li>
                                <li><Link href="#">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact & Location */}
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.locationTabs}>
                                <button className={`${styles.tabBtn} ${styles.active}`}>India</button>
                                <button className={styles.tabBtn}>USA</button>
                                <button className={styles.tabBtn}>Singapore</button>
                            </div>

                            <div className={styles.addressInfo}>
                                <p>No. 406, 9th Main Road, HRBR Layout 1st Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka, India - 560 043.</p>
                                <p className="mt-4">
                                    Email: <a href="mailto:manoj.p@netiapps.com">manoj.p@netiapps.com</a>
                                </p>
                            </div>

                            <div className={styles.certificates}>
                                <Image src="/images/certificate1.svg" alt="ISO Certified" width={50} height={50} />
                                <Image src="/images/certificate2.svg" alt="NASSCOM" width={80} height={32} />
                                <Image src="/images/certificate3.svg" alt="CMMI Level 3" width={65} height={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className={styles.copyrightBar}>
                <div className="container">
                    <p className="mb-0 text-center">
                        2026 Netiapps Software Solutions. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

