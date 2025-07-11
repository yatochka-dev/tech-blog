import type { Metadata } from "next";
import seoToMetadata from "~/lib/seo-to-metadata";
import Article from "./article";
import fetchPost from "~/app/(app)/(content)/[slug]/fetch-post";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const s = (await params).slug;

  const post = await fetchPost(s);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  if (!post.visible) {
    return {
      title: "Article not found",
    };
  }

  return {
    ...seoToMetadata(post.seo),
  };
}

// export async function generateStaticParams() {
//   const p = await payload();
//   const { docs } = await p.find({
//     collection: "posts",
//     where: {
//       status: {
//         equals: "PUBLISHED",
//       },
//     },
//     select: {
//       slug: true,
//     },
//   });
//
//   return docs.map((d) => ({ slug: d.slug }));
// }

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await fetchPost(slug);

  if (!post) notFound();

  return <Article post={post} />;
}
