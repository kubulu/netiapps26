import Link from "next/link";
import styles from "./page.module.scss";
import { ApiService } from "@/services/api.service";
import CareerApplyForm from "../../../components/CareerApplyForm/CareerApplyForm";
import CareerDetailClient from "../../../components/CareerDetail/CareerDetail";

export default async function CareerDetailPage({   params, }: { params: Promise<{ slug: string }>; }) {
  const baseUrl = new ApiService();
  const { slug } = await params;

  let Jobs: any[] = [];

  try {
    const resJobs = await fetch(
      baseUrl.getBaseUrl() +
        `wp-json/wp/v2/careerslist?slug=${slug}`,
      { cache: "no-store" }
    );

    Jobs = await resJobs.json();
  } catch (error) {
    console.error("Error fetching Jobs:", error);
  }

  if (!Jobs?.length || !Jobs[0]?.acf) {
    return (
      <main className={styles.emptyState}>
        <h2>Content not available</h2>
        <p>Data is not available in your CMS for this service.</p>
      </main>
    );
  }
  const job = Jobs[0].acf
console.log(job);
  return (
    <CareerDetailClient acf={Jobs[0].acf} />
  );
}
