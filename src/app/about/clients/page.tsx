import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import styles from './page.module.scss';
import ClientSpeaks from '@/components/ClientSpeaks/ClientSpeaks';
import { ApiService } from '@/services/api.service';

export const metadata: Metadata = {
    title: 'Our Clients | NetiApps',
    description: 'Trusted by leading companies across the globe. See who we have worked with.',
};

// interface PageProps {
//     params: Promise<{ slug: string }>;
// }
export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
    const baseUrl = new ApiService();
    let about: any[] = [];

    try {
        const resAbout = await fetch(
            baseUrl.getBaseUrl() + 'wp-json/wp/v2/about?slug=clients',
            { cache: 'no-store' }
        );
        about = await resAbout.json();
    } catch (error) {
        console.error('Clients API error:', error);
    }

    // 🔴 Entire CMS data missing
    if (!about?.length || !about[0]?.acf) {
        return (
            <main className={styles.emptyState}>
                <h2>Content not available</h2>
                <p>Clients page data is not configured in the CMS.</p>
            </main>
        );
    }

    const acf = about[0].acf;
    const content = acf?.content?.[0];
    const clientDetails = content?.client_details;

    return (
        <main>
            {/* ✅ Banner */}
            {acf?.banner && <InnerPageBanner banner={acf.banner} />}

            {/* ✅ Clients Section */}
            {clientDetails && (
                <section className={styles.clientsSection}>
                    <div className="container">

                        {/* Description */}
                        {clientDetails?.description && (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{
                                    __html: clientDetails.description,
                                }}
                            />
                        )}

                        {/* Logos */}
                        {Array.isArray(clientDetails?.logo) &&
                            clientDetails.logo.length > 0 && (
                                <div className={styles.clientsGrid}>
                                    {clientDetails.logo.map(
                                        (client: any, index: number) => (
                                            <div
                                                key={index}
                                                className={styles.clientCard}
                                            >
                                                <img
                                                    src={client.image}
                                                    alt={client.name || 'Client logo'}
                                                    width={160}
                                                    height={80}
                                                    className={styles.logo}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                </section>
            )}

            {/* ✅ Client Feedback */}
            {Array.isArray(content?.feedback) &&
                content.feedback.length > 0 && (
                    <ClientSpeaks testimonials={content.feedback} />
                )}
        </main>
    );
}
