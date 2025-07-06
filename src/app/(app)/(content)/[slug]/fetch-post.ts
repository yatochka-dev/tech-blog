import { unstable_cacheLife } from "next/cache";
import payload from "~/data-access";
import { cache } from "react";
import type { CollectionSlug } from "payload";
import type { Post } from "@payload-types";

export default cache(async function fetchPost(slug: string) {
  const p = await payload();

  const { docs } = await p.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
      visible: { equals: true },
    },
    depth: 2,
  });
  console.log(docs[0]?.visible ?? "not found i guess");
  if (!docs?.[0]) {
    return null;
  }

  const post = docs[0];
  return post;
});

export async function fetchDraftPost(slug: string, id = false) {
  const p = await payload();
  const query = {
    collection: "posts" as CollectionSlug,
    where: {
      ...(id ? { id: { equals: slug } } : { slug: { equals: slug } }),
    },
    depth: 2,
    draft: true,
  };

  const { docs } = await p.find(query);

  if (!docs?.[0]) {
    return null;
  }

  return docs[0] as Post;
}
