import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Privacy Policy | NetiApps',
    description: 'Privacy Policy for NetiApps. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
    return (
        <main>
            {/* <InnerPageBanner
                tag="Legal"
                title="Privacy Policy"
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'About', link: '#' },
                    { label: 'Privacy Policy' }
                ]}
                imageSrc="/images/innerbanner.png"
            /> */}

            <section className={styles.container}>
                <div className={styles.content}>
                    <p>Last updated: January 01, 2026</p>

                    <h2>1. Overview</h2>
                    <p>
                        NetiApps Technologies respects your privacy. This policy outlines how we handle your personal information when you visit our website.
                    </p>

                    <h2>2. Information Collection</h2>
                    <p>
                        We collect personal information you provide directly (like your name and email when contacting us) and automated data (such as IP address and browsing behavior) to improve your experience.
                    </p>

                    <h2>3. Usage & Sharing</h2>
                    <p>
                        Your data is used to respond to inquiries, improve our services, and communicate with you. We do not sell your personal information to third parties. We may share data with service providers who assist our operations, under strict confidentiality.
                    </p>

                    <h2>4. Security & Cookies</h2>
                    <p>
                        We employ security measures to protect your data, though no method is 100% secure. We use cookies to enhance site functionality; you can control these through your browser settings.
                    </p>

                    <h2>5. Contact Us</h2>
                    <p>
                        For privacy concerns, please contact us at:
                    </p>
                    <p>
                        <strong>NetiApps Technologies</strong><br />
                        No. 406, 9th Main Road, HRBR Layout 1st Block<br />
                        Kalyan Nagar, Bangalore - 560 043.<br />
                        Email: <a href="mailto:info@netiapps.com" style={{ color: '#E30613' }}>info@netiapps.com</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
