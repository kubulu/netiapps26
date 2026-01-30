import InnerPageBanner from '@/components/InnerPageBanner';
import styles from './page.module.scss';
import LatestInsight from '@/components/LatestInsight';
import type { Metadata } from 'next';
import Counter from "@/components/Counter/Counter";
import WhyUs from "@/components/WhyUs/WhyUs";
import ExcellenceSection from "@/components/ExcellenceSection/ExcellenceSection";
import Leadership from "@/components/Leadership/Leadership";
import MoreAboutCompany from "@/components/MoreAboutCompany/MoreAboutCompany";
import { ApiService } from '@/services/api.service';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our company",
};

export default async function AbtPage({ params }: PageProps) {
    const baseUrl = new ApiService();
    const { slug } = await params;

    let About: any[] = [];

    try {
        const resAbout = await fetch(
            baseUrl.getBaseUrl() + `wp-json/wp/v2/about?slug=${slug}`,
            { cache: 'no-store' }
        );

        About = await resAbout.json();
    } catch (error) {
        console.error('Error fetching services:', error);
    }

    if (!About?.length || !About[0]?.acf) {
        return (
            <main className={styles.emptyState}>
                <h2>Content not available</h2>
                <p>Data is not available in your CMS for this page.</p>
            </main>
        );
    }

    const about = About[0];
    const content = about?.acf.content?.[0];
    const clientDetails = content?.client_details;
    console.log(about);
    return (
        <main>
            {about?.acf?.banner && (
                <InnerPageBanner banner={about.acf.banner} />
            )}

            {about?.acf?.content?.length > 0 ? (
                about.acf.content.map((element: any, index: number) => (
                    <div key={index}>
                        {element.acf_fc_layout === 'client' && (
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

                        {element.acf_fc_layout === 'policy' && (
                            <section className={styles.container}>
                                <div className={styles.content}>
                                    <div dangerouslySetInnerHTML={{__html: element.content}} />
                                </div>
                            </section>
                        )}

                        {element.acf_fc_layout === 'about' && (
                            <>
                                {element.whyus && ( <WhyUs why={element.whyus}/> )}
                                {element.excellence && ( <ExcellenceSection data={element.excellence} /> )}
                                {element.leadership && ( <Leadership data={element.leadership}/> )}
                                {element.about && ( <MoreAboutCompany about={element.about} /> )}
                            </>
                        )}
                    </div>
                ))
            ) : (
                <div className={styles.emptyState}>
                    <p>Content is not configured in your CMS.</p>
                </div>
            )}

            <LatestInsight />
        </main>
    );
}
