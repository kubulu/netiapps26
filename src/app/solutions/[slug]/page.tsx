import InnerPageBanner from '@/components/InnerPageBanner';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import LatestInsight from '@/components/LatestInsight';
import ConnectNow from '@/components/ConnectNow';
import CoreServices from '@/components/CoreServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import WhatWeDo from '@/components/WhatWeDo';
import ServiceHighlight from '@/components/ServiceHighlight';
import ServiceIntroduction from '@/components/ServiceIntroduction';
import ServiceDualList from '@/components/ServiceDualList';
import SingleFullImage from '@/components/SingleFullImage';
import SingleText from '@/components/SingleText';
import WhyChoose from '@/components/WhyChoose';
import { services } from '@/data/servicesData';
import { ApiService } from '@/services/api.service';
import { hasContent } from "@/utils/hasContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServicesPage({ params }: PageProps) {
    const baseUrl = new ApiService();
    const { slug } = await params;

    let Solutions: any[] = [];

    try {
        const resSolutions = await fetch(
            baseUrl.getBaseUrl() + `wp-json/wp/v2/solutions?slug=${slug}`,
            { cache: 'no-store' }
        );

        Solutions = await resSolutions.json();
    } catch (error) {
        console.error('Error fetching Solutions:', error);
    }

    if (!Solutions?.length || !Solutions[0]?.acf) {
        return (
            <main className={styles.emptyState}>
                <h2>Content not available</h2>
                <p>Data is not available in your CMS for this page.</p>
            </main>
        );
    }

    const solution = Solutions[0];

    return (
        <main>

            {hasContent(solution?.acf?.banner) && (
                <InnerPageBanner banner={solution.acf.banner} />
            )}


            {solution?.acf?.content?.length > 0 ? (
                solution.acf.content.map((element: any, index: number) => (
                    <div key={index}>
                    {element.acf_fc_layout === "main_page" && (
                        <>
                        {hasContent(element.highlight) && (
                            <ServiceHighlight highlight={element.highlight} />
                        )}

                        {hasContent(element.what_we_do) && (
                            <WhatWeDo content={element.what_we_do} />
                        )}

                        {hasContent(element.why_choose_us) && (
                            <WhyChooseUs why={element.why_choose_us} />
                        )}

                        {hasContent(element.connect_now) && (
                            <ConnectNow connect={element.connect_now} />
                        )}
                        </>
                    )}

                    {element.acf_fc_layout === "inner_page" && (
                        <>
                        {hasContent(element.introduction) && (
                            <ServiceIntroduction intro={element.introduction} />
                        )}

                        {hasContent(element.dual_list) && (
                            <ServiceDualList data={element.dual_list} />
                        )}

                        {Array.isArray(element.single_image) &&
                            element.single_image.map((imgBlock: any, imgIndex: number) => (
                            <div key={imgIndex}>
                                {hasContent(imgBlock) && (
                                <SingleFullImage image={[imgBlock]} />
                                )}

                                {hasContent(element.text_content?.[imgIndex]) && (
                                <SingleText
                                    data={[element.text_content[imgIndex]]}
                                />
                                )}
                            </div>
                            ))}

                        {hasContent(element.why_choose) && (
                            <WhyChoose data={element.why_choose} />
                        )}

                        {hasContent(element.why_choose_us) && (
                            <WhyChooseUs why={element.why_choose_us} />
                        )}

                        {hasContent(element.connect_now) && (
                            <ConnectNow connect={element.connect_now} />
                        )}
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
