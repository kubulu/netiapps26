"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.scss";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Small delay to show animation smoothly after page load
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <h4>We value your privacy</h4>
                <p>
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                    By clicking "Accept All", you consent to our use of cookies.
                    Read our <Link href="/about/privacy-policy">Privacy Policy</Link>.
                </p>
            </div>
            <div className={styles.actions}>
                <button onClick={handleDecline} className={`${styles.btn} ${styles.declineBtn}`}>
                    Decline
                </button>
                <button onClick={handleAccept} className={`${styles.btn} ${styles.acceptBtn}`}>
                    Accept All
                </button>
            </div>
        </div>
    );
}
