import LatestInsight from "@/components/LatestInsight";
import Industries from "@/components/Industries";
import ClientSpeaks from "@/components/ClientSpeaks";
import Solutions from "@/components/Solutions";
import Services from "@/components/Services";
import ClientLogos from "@/components/ClientLogos";
import Hero from "@/components/Hero";

export default function Home() {
    return (
        <main>
            <Hero />
            <ClientLogos />
            <Services />
            <Solutions />
            <ClientSpeaks />
            <Industries />
            <LatestInsight />
        </main>
    );
}
