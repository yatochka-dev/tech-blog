"use client";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { api } from "~/trpc/react";
import Header, { useArticlesLimit } from "~/app/(app)/(content)/search/header";
import SearchFiltersComponent, {
  useTags,
} from "~/app/(app)/(content)/search/aside";
import { useEffect } from "react";

export default function SearchPage() {
  const [search] = useQueryState("q", { defaultValue: "" });

  const [limit] = useArticlesLimit();
  const [tags] = useTags();
  useEffect(() => {
    console.log("search", search);
    console.log("tags", tags);
  }, [search, tags]);

  const { data } = api.posts.search.useQuery({
    query: search,
    tags: tags,
    limit: limit,
  });

  return (
    <div className={"container mx-auto px-4 py-8"}>
      <Header />

      <div className={"mt-8 grid grid-cols-4 gap-8"}>
        <aside className={"col-span-4 md:col-span-2 lg:col-span-1"}>
          <SearchFiltersComponent />
        </aside>
        <pre className={"md:col-span-2 lg:col-span-3"}>
          {/*{JSON.stringify(data, null, 2)}*/}
        </pre>
      </div>
    </div>
  );
}
