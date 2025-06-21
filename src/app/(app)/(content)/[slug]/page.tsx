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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = (await params).slug;
  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: {
      slug: {
        equals: s,
      },
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
    return <PostNotFound />;
  }

  const cover = post.cover as unknown as Media;
  const author = post.author as unknown as User;
  return (
    <article className={"pb-12"}>
      <ArticleHeader
        title={post.title}
        description={post.description}
        type={post.type}
        coverImage={cover.url ?? ""}
        coverAlt={cover.alt}
      />

      <div className="container mx-auto mt-8 grid gap-8 px-4 md:grid-cols-4">
        {/* Article Sidebar */}
        <aside className="space-y-8 md:col-span-1">
          <ArticleMeta
            author={{
              avatar: (author.avatar as unknown as Media)
                .url as unknown as string,
              name: author.name,
            }}
            publishDate={post.createdAt}
            updateDate={post.updatedAt}
          />

          <ArticleTags tags={post.tags as unknown as Posttag[]} />
        </aside>

        {/* Article Content */}
        <div className="space-y-8 md:col-span-3">
          <ArticleContent post={post} />
          {/**/}
          {/*<CommentSection comments={article.comments} />*/}
          {/*<ArticleComments id={post.id} />*/}
        </div>
      </div>
    </article>
  );
}
