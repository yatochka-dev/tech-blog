import payload from "~/data-access";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

export async function fetchPost(slug: string) {
  "use cache";
  unstable_cacheLife("days");
  unstable_cacheTag("POST", `POST-${slug}`);
  const p = await payload();
  const { docs } = await p.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: "PUBLISHED",
      },
    },
    depth: 2,
  });

  if (!docs?.[0]) {
    return null;
  }

  const post = docs[0];
  // unstable_cacheTag("POST", `POST-${post.id}`);
  // unstable_cacheLife("days");
  return post;
}
