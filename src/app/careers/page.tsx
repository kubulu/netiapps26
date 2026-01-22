import InnerPageBanner from '@/components/InnerPageBanner';
import ConnectNow from '@/components/ConnectNow';
import CareerCards from '@/components/CareerCards';
import Image from 'next/image';

export default function CareersPage() {
    return (
        <main>
            {/* <InnerPageBanner
                tag="Careers"
                title="Our people are our greatest asset."
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Careers' }
                ]}
                imageSrc="/images/careers-banner.png"
            /> */}

            <CareerCards />

            <section style={{ padding: '4rem 0' }}>
                <Image
                    src="/images/careers-team.png"
                    alt="Our Diverse Team"
                    width={1920}
                    height={400}
                    quality={100}
                    priority
                    unoptimized
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </section>

            {/* <ConnectNow /> */}
        </main>
    );
}
