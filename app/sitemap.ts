import { listAllPosts } from "@/lib/posts";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://daadatech.com";
  const posts = await listAllPosts();

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    ...posts.map(p => ({
      url: `${baseUrl}/${p.type}/${p.slug}`,
      lastModified: new Date().toISOString()
    }))
  ];
}
