import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

type Type = "reviews" | "guides";

export async function listSlugs(type: Type) {
  const dir = path.join(CONTENT_DIR, type);
  try {
    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getPostBySlug(type: Type, slug: string) {
  try {
    const file = await fs.readFile(path.join(CONTENT_DIR, type, `${slug}.mdx`), "utf8");
    const { data, content } = matter(file);
    return { frontMatter: data as any, content };
  } catch {
    return null;
  }
}

export async function listAllPosts() {
  const types: Type[] = ["reviews", "guides"];
  const all = await Promise.all(
    types.map(async (t) => {
      const slugs = await listSlugs(t);
      const items = await Promise.all(
        slugs.map(async slug => {
          const post = await getPostBySlug(t, slug);
          return {
            type: t,
            slug,
            title: post?.frontMatter.title ?? slug,
            excerpt: post?.frontMatter.excerpt ?? "",
            date: post?.frontMatter.date ?? ""
          };
        })
      );
      return items;
    })
  );
  return all.flat().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
