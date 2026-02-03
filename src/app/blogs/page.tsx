import styles from "./page.module.scss";
import { ApiService } from "@/services/api.service";
import BlogsClient from "../../components/Blogs/Blogs";

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const baseUrl = new ApiService();
  await params; // slug not used here, but required to unwrap params

  let Blogs: any[] = [];

  try {
    const resBlogs = await fetch(
      baseUrl.getBaseUrl() + `wp-json/wp/v2/blogs?per_page=100`,
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

  return <BlogsClient blogs={Blogs} />;
}
