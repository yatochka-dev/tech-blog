import type { BasePayload } from "payload";
import payload from "~/data-access/index";
import type { Post } from "@payload-types";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export const APP_CONFIG_CACHE_TAG = "app-config";

export const getAppConfig = async (p?: BasePayload) => {
  "use cache";
  cacheLife("minutes");
  cacheTag(APP_CONFIG_CACHE_TAG);

  const payloadClient = p ?? (await payload());
  const conf = await payloadClient.findGlobal({
    slug: "appconf",
    depth: 5,
  });
  const currentYear = new Date().getFullYear();
  return {
    ...conf,
    currentYear,
    landingPageArticles: {
      heroPost: conf.landingPageArticles.heroPost as Post,
      latestArticles: conf.landingPageArticles.featuredPosts as Post[],
      researchArticles: conf.landingPageArticles.latestResearch as Post[],
    },
  };
};
