import { getPostBySlug, listSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = await listSlugs("guides");
  return slugs.map(slug => ({ slug }));
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug("guides", params.slug);
  if (!post) return <div>Not found</div>;

  return (
    <article>
      <h1 style={{fontSize:28, marginBottom:8}}>{post.frontMatter.title}</h1>
      <p style={{color:"#666", marginTop:0}}>{post.frontMatter.date}</p>
      <MDXRemote source={post.content} />
    </article>
  );
}
