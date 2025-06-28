"use cache";

import payload from "~/data-access";
import ArticleHeader from "~/app/(app)/(content)/[slug]/article-header";
import type { Media, Posttag, User } from "@payload-types";
import ArticleMeta from "./article-meta";
import ArticleTags from "./article-tags";
import ArticleContent from "~/app/(app)/(content)/[slug]/article-content";
import type { Metadata } from "next";
import seoToMetadata from "~/lib/seo-to-metadata";
// import ArticleComments from "~/app/(app)/(content)/[slug]/article-comments";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";
import Article from "./article";
import { Suspense } from "react";

function PostNotFound() {
  return (
    <div className={"flex h-[60dvh] w-full items-center justify-center"}>
      <Alert variant="destructive" className={"container mx-auto max-w-md"}>
        <AlertCircleIcon />
        <AlertTitle>The requested article doesn&apos;t exist.</AlertTitle>
        <AlertDescription>
          <p>Please make sure the entered URL is valid.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const s = (await params).slug;

  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: {
      slug: {
        equals: s,
      },
    },
    select: {
      seo: true,
      status: true,
    },
  });

  if (!docs) {
    throw new Error("Article not found");
  }

  const post = docs[0];

  if (!post) {
    throw new Error("Article not found");
  }

  if (post.status !== "PUBLISHED") {
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
  return (
    <Suspense fallback={"Loading your article..."}>
      <Article p={params} />
    </Suspense>
  );
}
