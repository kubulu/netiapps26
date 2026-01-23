import LatestInsight from "@/components/LatestInsight";
import Industries from "@/components/Industries";
import ClientSpeaks from "@/components/ClientSpeaks";
import Solutions from "@/components/Solutions";
import Services from "@/components/Services";
import ClientLogos from "@/components/ClientLogos";
import Hero from "@/components/Hero";
import { ApiService } from "../services/api.service";

export default async function Home() {
    const baseUrl = new ApiService();
    let home: any[] = [];

    try {
        const resHome = await fetch(
            baseUrl.getBaseUrl() + "wp-json/wp/v2/homepagesection", { cache: "no-store" });
        home = await resHome.json();
    } catch (error) {
        console.error("Home API error:", error);
    }

    if (!home?.length || !home[0]?.acf) {
        return (
            <main style={{ textAlign: "center", padding: "150px 20px" }}>
                <h2>Content not available</h2>
                <p>Homepage content is not configured in the CMS.</p>
            </main>
        );
    }

    const acf = home[0].acf;

    return (
        <main>

        {Array.isArray(acf.slides) && acf.slides.length > 0 && (
            <Hero slides={acf.slides} />
        )}

        {Array.isArray(acf.client_logo) && acf.client_logo.length > 0 && (
            <ClientLogos client={acf.client_logo} />
        )}

        {acf.services && Object.keys(acf.services).length > 0 && (
            <Services services={acf.services} />
        )}

        {acf.solution && Object.keys(acf.solution).length > 0 && (
            <Solutions solution={acf.solution} />
        )}

        {acf.client?.feedback?.length > 0 && (
            <ClientSpeaks testimonials={acf.client} />
        )}

        {acf.industry?.industry_section?.length > 0 && (
            <Industries industries={acf.industry} />
        )}

        <LatestInsight />
    </main>
    );
}
