"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import { useState } from "react";

export default function Footer(footer: any) {
    // console.log('Footer',footer);
    const addresses = footer.footer.address_field;

    // Default first country
    const [activeCountry, setActiveCountry] = useState(addresses[0]);
    return (
        <footer className={styles.footer}>
            <div className="container">
                {/* Hire CTA Section */}
                <div className={styles.hireCta}>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
                        <h2 className={styles.hireTitle}>
                            {footer.footer.footer_top.title}
                        </h2>
                        <Link href={footer.footer.footer_top.link} className={styles.hireBtn}>
                        {footer.footer.footer_top.button}
                        </Link>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className={styles.footerContent}>
                    <div className="row">
                            {footer.footer.menu.map((element: any, index: any)=>(
                                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0" key={index}>
                                    <h3 className={styles.columnTitle}>{element.title}</h3>
                                    {element.menu_list.map((ele: any, ind: any)=>(
                                    <ul className={styles.linkList} key={ind}>
                                        <li><Link href={ele.link}>{ele.name}</Link></li>
                                    </ul>
                                    ))}
                                    
                                </div>
                            ))}

                        {/* Contact & Location */}
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.locationTabs}>
                                {addresses.map((element: any, index: number) => (
                                    <button
                                        key={index}
                                        className={`${styles.tabBtn} ${
                                            activeCountry.country === element.country ? styles.active : ""
                                        }`}
                                        onClick={() => setActiveCountry(element)}
                                    >
                                        {element.country}
                                    </button>
                                ))}
                            </div>

                            {/* Address Details */}
                            <div className={styles.addressInfo}>
                                <p>{activeCountry.address}</p>

                                <p className="mt-4">
                                    Email:{" "}
                                    <a href={`mailto:${activeCountry.email}`}>
                                        {activeCountry.email}
                                    </a>
                                </p>
                            </div>
  
                            <div className={styles.certificates}>
                                {footer.footer.certificates.map((element: any, index: any)=>(
                                    <Image key={index} src={element.img} alt={element.name} width={50} height={50} />  
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className={styles.copyrightBar}>
                <div className="container">
                    <p className="mb-0 text-center">
                        {footer.footer.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}

