import type { Metadata } from 'next';
import InnerPageBanner from '@/components/InnerPageBanner';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import OfficeLocations from '@/components/OfficeLocations/OfficeLocations';
import { ApiService } from "../../services/api.service";


export const metadata: Metadata = {
    title: 'Contact Us | NetiApps',
    description: 'Get in touch with NetiApps. We are ready to help you build amazing digital solutions. Contact us for inquiries, partnerships, and support.',
};

export default async function ContactPage() {
    const baseUrl = new ApiService();
    let contact: any[] = [];

    try {
        const resContact = await fetch(
            baseUrl.getBaseUrl() + "wp-json/wp/v2/contact", { cache: "no-store" });
        contact = await resContact.json();
    } catch (error) {
        console.error("Contact API error:", error);
    }

    if (!contact?.length || !contact[0]?.acf) {
        return (
            <main style={{ textAlign: "center", padding: "150px 20px" }}>
                <h2>Content not available</h2>
                <p>Contact page content is not configured in the CMS.</p>
            </main>
        );
    }

    const acf = contact[0].acf;
    return (
        <main>
            {acf?.banner && (
                <InnerPageBanner banner={acf.banner} />
            )}
            {acf?.locations && (
                <OfficeLocations locations={acf.locations} />
            )}

            <ContactForm />
        </main>
    );
}
