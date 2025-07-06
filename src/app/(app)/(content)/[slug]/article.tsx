import React from "react";
import type { Media, Post, Posttag, User } from "@payload-types";
import ArticleHeader from "~/app/(app)/(content)/[slug]/article-header";
import ArticleMeta from "~/app/(app)/(content)/[slug]/article-meta";
import ArticleTags from "~/app/(app)/(content)/[slug]/article-tags";
import ArticleContent from "~/app/(app)/(content)/[slug]/article-content";

interface ArticleProps {
  post: Post;
}

const Article = async ({ post }: ArticleProps) => {
  const cover = post.cover as unknown as Media;
  const author = post.author as unknown as User;

  return (
    <article className="pb-12">
      <ArticleHeader
        title={post.title}
        description={post.description}
        type={post.type}
        coverImage={cover.url ?? ""}
        coverAlt={cover.alt}
      />

      <div className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* Article Sidebar */}
        <aside className="space-y-8 md:col-span-1">
          <ArticleMeta
            author={{
              avatar:
                (author.avatar as unknown as { url: string } | null)?.url ??
                "/default-avatar.jpg",
              name: author.name,
            }}
            publishDate={post.createdAt}
            updateDate={post.updatedAt}
          />

          <ArticleTags tags={post.tags as unknown as Posttag[]} />
        </aside>

        {/* Main Content */}
        <div className="mt-8 md:col-span-3">
          <ArticleContent post={post} />
        </div>
      </div>
    </article>
  );
};

export default Article;
