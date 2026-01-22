import { Sora } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { ApiService } from "../services/api.service";
import { LanguageProvider } from "@/context/LanguageContext";


const sora = Sora({ subsets: ["latin"] });

export const metadata = {
    title: "Netiapps",
    description: "Created with Next.js",
};

interface RootLayoutProps {
    children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
     const baseUrl = new ApiService();
    
        const resFooter = await fetch(baseUrl.getBaseUrl() + "wp-json/wp/v2/footersection");
        const resNav = await fetch(baseUrl.getBaseUrl() + "wp-json/wp/v2/navigationsection");
    
        const footer = await resFooter.json();
        const nav = await resNav.json();
        // console.log(footer);
    return (
        <html lang="en">
            <body className={sora.className}>
                <LanguageProvider>
                    <Navbar nav={nav[0].acf} />
                    {children}
                    <Footer footer={footer[0].acf} />
                    <BootstrapClient />
                </LanguageProvider>
            </body>
        </html>
    );
}
