// Type definitions for service data
import { getMediaUrl } from "@/lib/media";

export interface ServiceDetail {
    title: string;
    text: string;
}

export interface Service {
    id: string;
    slug: string;
    tag: string;
    title: string;
    description: string;
    longDescription: string;
    icon: string;
    image: string;
    subServices: string[];
    details: ServiceDetail[];
}

export const services: Service[] = [
    {
        id: "1",
        slug: "digital-strategy-and-consulting",
        tag: "Digital Strategy and Consulting",
        title: "Driving Growth with Innovative Digital Solutions",
        description: "We help businesses navigate the digital landscape with expert consulting and strategic planning for sustainable growth. In a rapidly evolving digital landscape, technology alone is not enough. Our Digital Strategy & Consulting services help organizations align business goals with the right digital, AI, and automation strategies—driving measurable impact, efficiency, and long-term growth.",
        longDescription: "Our consulting approach combines business insight, technology expertise, and AI-driven thinking to deliver transformation that works in the real world. We partner with enterprises to design, plan, and execute digital transformation journeys that are practical, scalable, and future-ready. Whether you are looking to modernize your legacy systems, adopt AI, or optimize your business processes, our team of experts is here to guide you every step of the way.",
        icon: getMediaUrl("/images/service1.png"),
        image: getMediaUrl("/images/innerbanner.png"),
        subServices: [
            "Digital Transformation Consulting",
            "Product & Platform Strategy",
            "Business Process Analysis & Optimization",
            "Technology Road mapping",
            "AI Adoption & Readiness Assessment"
        ],
        details: [
            {
                title: "Expert Guidance",
                text: "Access deep industry knowledge and technical expertise to make informed decisions."
            },
            {
                title: "Customized Roadmaps",
                text: "Strategic plans tailored to your specific business goals and market challenges."
            },
            {
                title: "Future-Proof Solutions",
                text: "Implement technology that scales with your business and stays relevant."
            }
        ]
    },
    {
        id: "2",
        slug: "web-development-services",
        tag: "Web Development",
        title: "Building Scalable and High-Performance Web Applications",
        description: "Custom web applications designed for performance, scalability, and exceptional user experiences across all devices.",
        longDescription: "We specialize in creating robust, scalable, and secure web applications using the latest technologies. Our development process is focused on delivering a seamless user experience while ensuring high performance and security. From e-commerce platforms to enterprise portals, we build solutions that drive business growth and user engagement.",
        icon: getMediaUrl("/images/service1.png"),
        image: getMediaUrl("/images/innerbanner.png"),
        subServices: ["Frontend Development", "Backend Systems", "Full Stack Solutions", "E-commerce Development"],
        details: [
            {
                title: "Modern Tech Stack",
                text: "We use React, Next.js, Node.js, and other cutting-edge technologies."
            },
            {
                title: "Performance First",
                text: "Optimized for speed and SEO to ensure maximum reach and engagement."
            },
            {
                title: "Responsive Design",
                text: "Flawless performance across desktops, tablets, and mobile devices."
            }
        ]
    },
    {
        id: "3",
        slug: "mobile-app-development",
        tag: "Mobile Development",
        title: "Innovative Mobile Solutions for Modern Enterprises",
        description: "Innovative iOS and Android applications that engage users and drive business value through intuitive design.",
        longDescription: "Our mobile development team creates high-quality native and cross-platform applications that provide an exceptional user experience. We focus on performance, security, and intuitive design to ensure your app stands out in the crowded marketplace. From concept to launch, we handle every aspect of the mobile app lifecycle.",
        icon: getMediaUrl("/images/service1.png"),
        image: getMediaUrl("/images/innerbanner.png"),
        subServices: ["iOS Development", "Android Development", "React Native", "Flutter"],
        details: [
            {
                title: "Native Performance",
                text: "Apps built for speed and responsiveness on their respective platforms."
            },
            {
                title: "User-Centric Design",
                text: "Interfaces designed for ease of use and high engagement."
            },
            {
                title: "Secure & Reliable",
                text: "Built with the highest security standards to protect user data."
            }
        ]
    }
];
