import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import styles from './page.module.scss';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Use | NetiApps',
    description: 'Read the Terms of Use for NetiApps. Understand the rules and regulations for using our website and services.',
};

export default function TermsOfUse() {
    return (
        <main>
            {/* <InnerPageBanner
                tag="Legal"
                title="Terms of Use"
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'About', link: '#' }, // Assuming 'About' parent link might not exist or be active yet
                    { label: 'Terms of Use' }
                ]}
                imageSrc="/images/innerbanner.png"
            /> */}

            <section className={styles.container}>
                <div className={styles.content}>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and NetiApps Technologies ("Company," "we," "us," or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). By accessing the Site, you represent that you have read, understood, and agree to be bound by all of these Terms of Use.
                    </p>
                    <p>
                        If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                    </p>

                    <h2>2. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>
                    <p>
                        The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                    </p>

                    <h2>3. User Representations</h2>
                    <p>
                        By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                    </p>

                    <h2>4. Prohibited Activities</h2>
                    <p>
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                    <p>
                        As a user of the Site, you agree not to:
                    </p>
                    <ul>
                        <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                        <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                        <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                        <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                        <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                    </ul>

                    <h2>5. Site Management</h2>
                    <p>
                        We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; and (4) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
                    </p>

                    <h2>6. Modifications and Interruptions</h2>
                    <p>
                        We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
                    </p>

                    <h2>7. Functionality Disclaimer</h2>
                    <p>
                        The site is provided on an as-is and as-available basis. You agree that your use of the site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>

                    <h2>8. Contact Us</h2>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                    </p>
                    <p>
                        <strong>NetiApps Technologies</strong><br />
                        No. 406, 9th Main Road, HRBR Layout 1st Block<br />
                        Kalyan Nagar, Bangalore - 560 043.<br />
                        Phone: +91 80 1234 5678<br />
                        Email: <a href="mailto:info@netiapps.com" style={{ color: '#E30613' }}>info@netiapps.com</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
