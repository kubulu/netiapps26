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
import { services } from '@/data/servicesData';

// Removing local allServices array as it's now in src/data/servicesData.js

export default function ServicesPage() {
    return (
        <main>
            <InnerPageBanner
                tag="Digital Strategy and Consulting"
                title="Driving Growth with Innovative Digital Solutions"
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Services', link: '/services' },
                    { label: 'Digital Strategy and Consulting' }
                ]}
                imageSrc="/images/innerbanner.png"
            />
            <ServiceHighlight />
            <WhatWeDo />
            <WhyChooseUs />
            <CoreServices />
            <ConnectNow />
            <LatestInsight />
        </main>
    );
}
