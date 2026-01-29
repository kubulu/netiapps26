import InnerPageBanner from "@/components/InnerPageBanner";
import Counter from "@/components/Counter/Counter";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import ExcellenceSection from "@/components/ExcellenceSection/ExcellenceSection";
import Leadership from "@/components/Leadership/Leadership";
import MoreAboutCompany from "@/components/MoreAboutCompany/MoreAboutCompany";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our company",
};

export default function AboutUs() {
    const banner = {
        tag: "Who We Are",
        title: "About Us",
        breadcrumbs: [
            { label: "Home", link: "/" },
            { label: "About Us" },
        ],
        image: "/images/innerbanner.png",
    };

    return (
        <main>
            <InnerPageBanner banner={banner} />
            <div className="container" style={{ padding: "50px 20px", minHeight: "40vh" }}>
                <Counter />
            </div>
            <WhyChooseUs />
            <ExcellenceSection />
            <Leadership />
            <MoreAboutCompany />
        </main>
    );
}
