import { Sora } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const sora = Sora({ subsets: ["latin"] });

export const metadata = {
    title: "Modern Next.js App",
    description: "Created with Next.js",
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={sora.className}>
                <Navbar />
                {children}
                <Footer />
                <BootstrapClient />
            </body>
        </html>
    );
}
