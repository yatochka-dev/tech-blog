"use client";
import { useQueryState, parseAsInteger } from "nuqs";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { MouseEventHandler } from "react";

export default function SearchPage() {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [limit] = useArticlesLimit();
  const [tags] = useTags();
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    ...parseAsInteger,
  });

  // // Log only in development to avoid noisy console in production
  // useEffect(() => {
  //   if (env.NODE_ENV === "development") {
  //     console.debug("search", search);
  //     console.debug("tags", tags);
  //   }
  // }, [search, tags]);

  const { data, isLoading, isError } = api.posts.search.useQuery(
    { query: search, tags, limit, page },
    {
      staleTime: 60_000,
    },
  );

  if (isError) {
    throw new Error(
      "Something went wrong while loading your articles, please try again later.",
    );
  }

  async function onPageChange(func: () => Promise<void>) {
    return async (event: MouseEvent) => {
      event?.stopPropagation();
      event?.preventDefault();
      await func();
    };
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
        <section className="flex min-h-full flex-col lg:col-span-3">
          {isLoading && (
            <div className="text-center">
              <TextShimmer duration={1}>Loading articles...</TextShimmer>
            </div>
          )}

          {!isLoading && data?.docs?.length === 0 && (
            <p className="text-center">No articles matched your search.</p>
          )}

          <ul className="grid flex-grow grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

          {data && (
            <div className={"mt-auto"}>
              <Pagination>
                <PaginationContent>
                  {data.hasPrevPage && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={async () => {
                          await setPage((p) => p - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  {(data?.page ?? 1) - 2 > 1 && (
                    <>
                      <PaginationItem
                        onClick={async () => {
                          await setPage(() => 1);
                        }}
                      >
                        <PaginationLink>1</PaginationLink>
                      </PaginationItem>
                      {(data?.page ?? 1) - 3 > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}
                  {(data?.page ?? 1) - 2 > 0 && (
                    <PaginationItem
                      onClick={async () => {
                        await setPage((p) => p - 2);
                      }}
                    >
                      <PaginationLink>{(data?.page ?? 1) - 2}</PaginationLink>
                    </PaginationItem>
                  )}
                  {(data?.page ?? 1) - 1 > 0 && (
                    <PaginationItem
                      onClick={async () => {
                        await setPage((p) => p - 1);
                      }}
                    >
                      <PaginationLink>{(data?.page ?? 1) - 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink isActive>{data.page}</PaginationLink>
                  </PaginationItem>
                  {data.totalPages >= (data.page ?? 1) + 1 && (
                    <PaginationItem
                      onClick={async () => {
                        await setPage((p) => p + 1);
                      }}
                    >
                      <PaginationLink>{(data?.page ?? 1) + 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  {data.totalPages - 2 > (data.page ?? 1) && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {data.totalPages - 1 > (data.page ?? 1) && (
                    <PaginationItem
                      onClick={async () => {
                        await setPage((p) => data.totalPages);
                      }}
                    >
                      <PaginationLink>{data?.totalPages}</PaginationLink>
                    </PaginationItem>
                  )}

                  {data.hasNextPage && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={async () => {
                          await setPage((p) => p + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
