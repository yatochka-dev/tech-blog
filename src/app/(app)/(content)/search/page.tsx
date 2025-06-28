"use client";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { api } from "~/trpc/react";
import Header from "~/app/(app)/(content)/search/header";
import SearchFiltersComponent from "~/app/(app)/(content)/search/aside";

export default function SearchPage() {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [tags, setTags] = useQueryState<number[]>("tags", {
    serialize: (value) => {
      return JSON.stringify(value);
    },
    defaultValue: [],
    parse: (value) => {
      console.log(value);
      const schema = z.number().positive().array();
      const { data, success } = schema.safeParse(JSON.parse(value));
      if (!success) return [];
      return data;
    },
  });

  const { data } = api.posts.search.useQuery({
    query: search,
    tags: tags,
  });

  return (
    <div className={"container mx-auto px-4 py-8"}>
      <Header />

      <div className={"mt-8 grid grid-cols-4 gap-8"}>
        <aside className={"col-span-4 md:col-span-2 lg:col-span-1"}>
          <SearchFiltersComponent />
        </aside>
        <div className={"md:col-span-2 lg:col-span-3"}></div>
      </div>
    </div>
  );
}
