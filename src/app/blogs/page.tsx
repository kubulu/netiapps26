import styles from "./page.module.scss";
import { ApiService } from "@/services/api.service";
import BlogsClient from "../../components/Blogs/Blogs";
import type { Metadata } from "next";

async function getBlogsPageData() {
  const baseUrl = new ApiService();

  const res = await fetch(
    baseUrl.getBaseUrl() + `wp-json/wp/v2/blogs?per_page=1`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.[0] ?? null;
}
export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogsPageData();
  const seo = page?.yoast_head_json;

  if (!seo) {
    return {
      title: "Blogs | NetiApps",
      description:
        "Explore insights, updates, and expert articles from NetiApps.",
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
      images: seo.og_image?.map((img: any) => ({
        url: img.url,
      })),
    },
  };
}
export default async function BlogsPage() {
  const baseUrl = new ApiService();

  let Blogs: any[] = [];

  try {
    const resBlogs = await fetch(
      baseUrl.getBaseUrl() + `wp-json/wp/v2/blogs?per_page=100`,
      { next: { revalidate: 60 } }
    );

    Blogs = await resBlogs.json();
  } catch (error) {
    console.error("Error fetching Blogs:", error);
  }

  if (!Blogs?.length || !Blogs[0]?.acf) {
    return (
      <main className={styles.emptyState}>
        <h2>Content not available</h2>
        <p>Data is not available in your CMS for this service.</p>
      </main>
    );
  }

  return <BlogsClient blogs={Blogs} />;
}
