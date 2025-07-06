import type { Metadata } from "next";
import seoToMetadata from "~/lib/seo-to-metadata";
import { fetchDraftPost } from "~/app/(app)/(content)/[slug]/fetch-post";
import { notFound } from "next/navigation";
import Article from "../article";
import { RefreshRouteOnSave } from "~/app/rors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const s = (await params).slug;

  const post = await fetchDraftPost(s);

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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await fetchDraftPost(slug);

  if (!post) notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <Article post={post} />
    </>
  );
}
