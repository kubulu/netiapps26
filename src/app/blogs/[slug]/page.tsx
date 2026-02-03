import styles from "./page.module.scss";
import { ApiService } from "@/services/api.service";
import BlogDetailClient from "../../../components/BlogsDetail/BlogsDetail";
import type { Metadata } from "next";

async function getBlogDetailData(slug: string) {
  const baseUrl = new ApiService();

  const res = await fetch(
    baseUrl.getBaseUrl() + `wp-json/wp/v2/blogs?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.[0] ?? null;
}
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const blog = await getBlogDetailData(params.slug);
  const seo = blog?.yoast_head_json;

  if (!seo) {
    return {
      title: blog?.title?.rendered || "Blog | NetiApps",
      description:
        "Read the latest insights, updates, and expert articles from NetiApps.",
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      type: "article",
      images: seo.og_image?.map((img: any) => ({
        url: img.url,
      })),
    },
  };
}
export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogDetailData(slug);

  if (!blog?.acf) {
    return (
      <main className={styles.emptyState}>
        <h2>Content not available</h2>
        <p>Data is not available in your CMS for this service.</p>
      </main>
    );
  }

  return <BlogDetailClient blog={blog} />;
}
