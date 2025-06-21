import type { BasePayload } from "payload";
import payload from "~/data-access/index";
import type { Post } from "@payload-types";

export const getAppConfig = async (p?: BasePayload) => {
  const payloadClient = p ?? (await payload());

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
