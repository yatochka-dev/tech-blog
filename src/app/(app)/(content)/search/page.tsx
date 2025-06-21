"use client";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { api } from "~/trpc/react";

export default function SearchPage() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
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
    <div className={"flex flex-col"}>
      <h1>
        {search} {tags} - {JSON.stringify(data)}
      </h1>
      <input
        type="text"
        onChange={async (v) => {
          await setSearch(v.target.value);
        }}
      />
    </div>
  );
}
