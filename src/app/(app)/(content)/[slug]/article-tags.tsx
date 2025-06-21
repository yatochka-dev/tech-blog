import Link from "next/link";

interface Tag {
  id: number;
  label: string;
}

interface ArticleTagsProps {
  tags: Tag[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/search?tags=[${tag.id}]`}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition-colors hover:bg-gray-200"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
