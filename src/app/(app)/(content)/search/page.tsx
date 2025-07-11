"use client";
import { useQueryState } from "nuqs";
import { api } from "~/trpc/react";
import SearchHeader, {
  useArticlesLimit,
} from "~/app/(app)/(content)/search/header";
import SearchFiltersComponent, {
  useTags,
} from "~/app/(app)/(content)/search/aside";
import ArticleCard from "~/components/article-card";
import { displayDate } from "~/lib/date";
import { TextShimmer } from "~/components/ui/text-shimmer";
import type { Media } from "@payload-types";

export default function SearchPage() {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [limit] = useArticlesLimit();
  const [tags] = useTags();

  // // Log only in development to avoid noisy console in production
  // useEffect(() => {
  //   if (env.NODE_ENV === "development") {
  //     console.debug("search", search);
  //     console.debug("tags", tags);
  //   }
  // }, [search, tags]);

  const { data, isLoading, isError } = api.posts.search.useQuery(
    { query: search, tags, limit },
    {
      staleTime: 60_000, // keep fresh for 1 min to reduce flicker on filter changes
    },
  );

  if (isError) {
    throw new Error(
      "Something went wrong while loading your articles, please try again later.",
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchHeader />

      {/* Outer grid: sidebar + results */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar — drops below results on mobile */}
        <aside className="lg:col-span-1">
          <SearchFiltersComponent />
        </aside>

        {/* Results */}
        <section className="lg:col-span-3">
          {isLoading && (
            <div className="text-center">
              <TextShimmer duration={1}>Loading articles...</TextShimmer>
            </div>
          )}

          {!isLoading && data?.docs?.length === 0 && (
            <p className="text-center">No articles matched your search.</p>
          )}

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data?.docs?.map((post) => (
              <li key={post.id} className="h-full">
                <ArticleCard
                  title={post.title}
                  summary={post.description}
                  image={(post?.cover as Media).url ?? ""}
                  alt={(post.cover as Media).alt ?? post.title}
                  date={displayDate(new Date(post.createdAt))}
                  link={`/${post.slug}`}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
