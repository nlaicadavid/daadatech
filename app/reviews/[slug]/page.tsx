import { getPostBySlug, listSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = await listSlugs("reviews");
  return slugs.map(slug => ({ slug }));
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug("reviews", params.slug);
  if (!post) return <div>Not found</div>;

  return (
    <article>
      <h1 style={{fontSize:28, marginBottom:8}}>{post.frontMatter.title}</h1>
      <p style={{color:"#666", marginTop:0}}>{post.frontMatter.date}</p>

      {post.frontMatter.asin && (
        <div style={{margin:"16px 0"}}>
          <a
            href={`https://www.amazon.com/dp/${post.frontMatter.asin}?tag=YOURTAG-20&ascsubtag=${params.slug}`}
            rel="nofollow sponsored"
            target="_blank"
            style={{
              display:"inline-block",
              padding:"10px 14px",
              borderRadius:8,
              border:"1px solid #111"
            }}
          >
            Check price on Amazon
          </a>
        </div>
      )}

      <MDXRemote source={post.content} />
    </article>
  );
}
