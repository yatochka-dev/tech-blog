import Image from "next/image";
import Link from "next/link";
import type { Media, Post } from "../../payload-types";
import { displayDate } from "~/lib/date";
import { displayPostType } from "~/lib/post-type";
import TransitionLink from "~/components/transition-link";

interface PostCardProps {
  post: Post;
  isResearch?: boolean;
  isNew?: boolean;
}

export default function PostCard({
  post,
  isResearch = false,
  isNew = false,
}: PostCardProps) {
  // Handle cover as Media or string fallback
  const cover = post?.cover as Media;
  const imageUrl = cover?.url ?? "https://placehold.co/300x200";
  const imageAlt = cover?.alt ?? "";

  const postUrl = `/${post.slug}`;

  // Format date as, e.g., 16 May 2025
  const formattedDate = displayDate(new Date(post.createdAt));
  if (isResearch) {
    return (
      <div className="rounded-lg shadow-sm">
        {isNew && (
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
            New
          </span>
        )}
        <TransitionLink href={postUrl} className="group">
          <h3 className="mt-2 text-lg font-bold group-hover:text-blue-700">
            {post.title}
          </h3>
        </TransitionLink>
        <p className="mt-2 text-sm text-gray-700">{post.description}</p>
        <p className="mt-3 text-xs text-gray-500">Published: {formattedDate}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative mb-2 h-48">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <TransitionLink href={postUrl} className="group">
        <h3 className="text-lg leading-tight font-bold group-hover:text-blue-700">
          {post.title}
        </h3>
      </TransitionLink>
      <p className="text-sm text-gray-700">{post.description}</p>
      <div className="mt-auto pt-2">
        <p className="text-xs text-gray-500">
          {displayPostType(post.type)}&nbsp;•&nbsp;{formattedDate}
        </p>
      </div>
    </div>
  );
}
