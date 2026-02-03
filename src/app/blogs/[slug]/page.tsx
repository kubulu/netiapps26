import styles from "./page.module.scss";
import { ApiService } from "@/services/api.service";
import BlogDetailClient from "../../../components/BlogsDetail/BlogsDetail";

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const baseUrl = new ApiService();
  const { slug } = await params;

  let Blogs: any[] = [];

  try {
    const resBlogs = await fetch(
      baseUrl.getBaseUrl() + `wp-json/wp/v2/blogs?slug=${slug}`,
      { cache: "no-store" }
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

  return (
  
    <BlogDetailClient blog={Blogs[0]} />

  );
}
