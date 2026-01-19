import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import OfficeLocations from '@/components/OfficeLocations/OfficeLocations';

export const metadata: Metadata = {
    title: 'Contact Us | NetiApps',
    description: 'Get in touch with NetiApps. We are ready to help you build amazing digital solutions. Contact us for inquiries, partnerships, and support.',
};

export default function ContactPage() {
    return (
        <main>
            <InnerPageBanner
                tag="Contact Us"
                title="Let's Build Something Amazing Together"
                breadcrumbs={[
                    { label: 'Home', link: '/' },
                    { label: 'Contact Us' }
                ]}
                imageSrc="/images/contact-banner.png"
            />

            <ContactInfo />

            <OfficeLocations />

            <ContactForm />
        </main>
    );
}
