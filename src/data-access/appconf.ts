import type { BasePayload } from "payload";
import payload from "~/data-access/index";
import type { Post } from "@payload-types";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const getAppConfig = async (p?: BasePayload) => {
  const payloadClient = p ?? (await payload());
  console.log("APP CONFIG");
  const conf = await payloadClient.findGlobal({
    slug: "appconf",
    depth: 5,
  });

  return {
    ...conf,
    landingPageArticles: {
      heroPost: conf.landingPageArticles.heroPost as Post,
      latestArticles: conf.landingPageArticles.featuredPosts as Post[],
      researchArticles: conf.landingPageArticles.latestResearch as Post[],
    },
  };
};

export const revalidateHomePage = () => {
  revalidatePath("/");
};
