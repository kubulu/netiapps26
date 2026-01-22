"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer(footer: any) {
  const { language, translate } = useLanguage();

  const originalFooter = footer.footer;
  const [translatedFooter, setTranslatedFooter] = useState(originalFooter);

  /* ---------------- TRANSLATION LOGIC ---------------- */
  useEffect(() => {
    async function translateFooter() {
      if (language === "en") {
        setTranslatedFooter(originalFooter);
        return;
      }

      const translated = JSON.parse(JSON.stringify(originalFooter));

      // Hire CTA
      translated.footer_top.title = await translate(
        originalFooter.footer_top.title
      );
      translated.footer_top.button = await translate(
        originalFooter.footer_top.button
      );

      // Footer menu columns
      for (let column of translated.menu) {
        column.title = await translate(column.title);

        for (let item of column.menu_list) {
          item.name = await translate(item.name);
        }
      }

      // Addresses
      for (let addr of translated.address_field) {
        addr.country = await translate(addr.country);
        addr.address = await translate(addr.address);
      }

      // Copyright
      translated.copyright = await translate(
        originalFooter.copyright
      );

      setTranslatedFooter(translated);
    }

    translateFooter();
  }, [language, originalFooter, translate]);
  /* --------------------------------------------------- */

  const addresses = translatedFooter.address_field;

  // Default first country
  const [activeCountry, setActiveCountry] = useState(addresses[0]);

  // Update active country when language changes
  useEffect(() => {
    setActiveCountry(addresses[0]);
  }, [addresses]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Hire CTA */}
        <div className={styles.hireCta}>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
            <h2 className={styles.hireTitle}>
              {translatedFooter.footer_top.title}
            </h2>

            <Link
              href={translatedFooter.footer_top.link}
              className={styles.hireBtn}
            >
              {translatedFooter.footer_top.button}
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className={styles.footerContent}>
          <div className="row">
            {translatedFooter.menu.map((element: any, index: number) => (
              <div
                className="col-lg-3 col-md-6 mb-4 mb-lg-0"
                key={index}
              >
                <h3 className={styles.columnTitle}>{element.title}</h3>

                <ul className={styles.linkList}>
                  {element.menu_list.map((ele: any, ind: number) => (
                    <li key={ind}>
                      <Link href={ele.link}>{ele.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Address Section */}
            <div className="col-lg-3 col-md-6">
              <div className={styles.locationTabs}>
                {addresses.map((element: any, index: number) => (
                  <button
                    key={index}
                    className={`${styles.tabBtn} ${
                      activeCountry.country === element.country
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => setActiveCountry(element)}
                  >
                    {element.country}
                  </button>
                ))}
              </div>

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
                {translatedFooter.certificates.map(
                  (element: any, index: number) => (
                    <img
                      key={index}
                      src={element.img}
                      alt={element.name}
                      width={50}
                      height={50}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyrightBar}>
        <div className="container">
          <p className="mb-0 text-center">
            {translatedFooter.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
