import Link from "next/link";
import styles from "./MoreAboutCompany.module.scss";

export default function MoreAboutCompany() {
    const items = [
        {
            title: "Scalable apps, made easy",
            description: (
                <>
                    We use best-in-class technologies, cloud-native architectures, and
                    modern DevOps practices to build secure, scalable, and
                    high-performance{" "}
                    <Link href="/services/applications">applications</Link>. With deep AWS
                    expertise and cloud experience, we ensure reliability, speed, and
                    seamless scalability.
                </>
            ),
        },
        {
            title: "Always On Time, Always On Target",
            description: (
                <>
                    We set realistic timelines based on your business goals and deliver
                    without disrupting your operations. Our enterprise software experience
                    ensures smooth scaling, cost-efficiency, and long-term
                    sustainability.
                </>
            ),
        },
        {
            title: "A Team Committed to Excellence",
            description: (
                <>
                    Backed by 20+ years of combined expertise, our team delivers
                    world-class <Link href="/services/ui-ux">UI/UX design</Link>,{" "}
                    <Link href="/services/custom-software">custom software</Link>,
                    enterprise systems, <Link href="/services/web">web</Link> and{" "}
                    <Link href="/services/mobile">mobile apps</Link>, and more—while
                    maintaining affordability and uncompromised quality.
                </>
            ),
        },
        {
            title: "A Team Committed to Excellence",
            description: (
                <>
                    Backed by 20+ years of combined expertise, our team delivers
                    world-class <Link href="/services/ui-ux">UI/UX design</Link>,{" "}
                    <Link href="/services/custom-software">custom software</Link>,
                    enterprise systems, <Link href="/services/web">web</Link> and{" "}
                    <Link href="/services/mobile">mobile apps</Link>, and more—while
                    maintaining affordability and uncompromised quality.
                </>
            ),
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.list}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <div className={styles.description}>{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
