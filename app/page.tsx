import { listAllPosts } from "@/lib/posts";
import Link from "next/link";

export default async function HomePage() {
  const posts = await listAllPosts();
  return (
    <>
      <h1 style={{fontSize:28, marginBottom:8}}>Latest Reviews & Guides</h1>
      <p style={{color:"#555", marginBottom:24}}>
        Hands-on picks, comparisons, and buying advice.
      </p>

      <div style={{
        display:"grid", 
        gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", 
        gap:16
      }}>
        {posts.map(p => (
          <article 
            key={`${p.type}-${p.slug}`} 
            style={{border:"1px solid #eee", borderRadius:12, padding:16}}
          >
            <h2 style={{fontSize:18, margin:"0 0 8px"}}>
              <Link href={`/${p.type}/${p.slug}`} style={{textDecoration:"none"}}>
                {p.title}
              </Link>
            </h2>
            <p style={{color:"#666", fontSize:14, margin:"0 0 12px"}}>
              {p.excerpt}
            </p>
            <Link href={`/${p.type}/${p.slug}`} style={{fontSize:14}}>
              Read →
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
