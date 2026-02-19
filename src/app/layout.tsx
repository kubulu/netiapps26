import { Sora } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import "./hubspot-form-overrides.css";

import BootstrapClient from "@/components/BootstrapClient";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { ApiService } from "../services/api.service";
import { LanguageProvider } from "@/context/LanguageContext";

import Script from "next/script";

const sora = Sora({ subsets: ["latin"], display: 'swap' });


export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.netiapps.com'),
    title: "NetiApps – Innovative App & Digital Solutions",
    description: "NetiApps delivers cutting-edge mobile apps, web development, and digital solutions designed to help businesses grow, scale, and succeed in the digital world.",
    alternates: {
        canonical: './',
    },
};

interface RootLayoutProps {
    children: ReactNode;
}


async function safeFetch(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 10 } });

        if (!res.ok) {
            console.error("CMS fetch failed:", url, res.status);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("CMS fetch error:", url, error);
        return null;
    }
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const baseUrl = new ApiService().getBaseUrl();

    const [footerRes, navRes] = await Promise.all([
        safeFetch(`${baseUrl}wp-json/wp/v2/footersection`),
        safeFetch(`${baseUrl}wp-json/wp/v2/navigationsection`),
    ]);

    const footerData = footerRes?.[0]?.acf ?? null;
    const navData = navRes?.[0]?.acf ?? null;

    return (
        <html lang="en">
            <body className={sora.className}>
                <LanguageProvider>

                    {navData ? (
                        <Navbar nav={navData} />
                    ) : (
                        <div style={{ height: 80 }} />
                    )}

                    {children}

                    {footerData ? (
                        <Footer footer={footerData} />
                    ) : (
                        <div className="text-center py-4 text-muted">
                        </div>
                    )}

                    <BootstrapClient />
                    <CookieConsent />
                </LanguageProvider>
                {/* <!-- Start of HubSpot Embed Code --> */}
                <Script
                    type="text/javascript"
                    id="hs-script-loader"
                    strategy="afterInteractive"
                    src="//js-na2.hs-scripts.com/245019687.js"
                />
                {/* <!-- End of HubSpot Embed Code --> */}
            </body>
        </html>
    );
}
