import InnerPageBanner from '@/components/InnerPageBanner';
import ConnectNow from '@/components/ConnectNow';
import LatestInsight from '@/components/LatestInsight';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServiceIntroduction from '@/components/ServiceIntroduction';
import ServiceDualList from '@/components/ServiceDualList';
import SingleFullImage from '@/components/SingleFullImage';
import SingleText from '@/components/SingleText';
import WhyChoose from '@/components/WhyChoose';
import { services } from '@/data/servicesData';
import styles from './page.module.scss';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PageParams {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return services.map((service) => ({
        id: service.id,
    }));
}

export default async function ServiceDetail({ params }: PageParams) {
    const { id } = await params;
    const service = services.find(s => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <main>
            <InnerPageBanner
                tag={service.tag}
                title={service.title}
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Services', link: '/services' },
                    { label: service.tag }
                ]}
                imageSrc={service.image}
            />

            <ServiceIntroduction
                title={service.tag}
                description={service.description}
                longDescription={service.longDescription}
            />

            <ServiceDualList />
            <SingleFullImage />
            <SingleText />
            <SingleFullImage />
            <SingleText />
            <WhyChoose />
            <WhyChooseUs />
            <ConnectNow />
            <LatestInsight />
        </main>
    );
}
