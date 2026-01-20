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

    const resHome = await fetch(baseUrl.getBaseUrl() + "wp-json/wp/v2/homepagesection");

    const home = await resHome.json();
    return (
        <main>
            <Hero />
            <ClientLogos client={home[0].acf.client_logo} />
            <Services services={home[0].acf.services} />
            <Solutions solution={home[0].acf.solution}  />
            <ClientSpeaks testimonials={home[0].acf.client} />
            <Industries industries={home[0].acf.industry}/>
            <LatestInsight />
        </main>
    );
}

