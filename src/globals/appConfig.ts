import type { GlobalConfig } from "payload";
import all from "~/access/all";
import admin from "~/access/admin";
import { SeoField } from "~/fields/seo";
import { revalidateHomePage } from "~/data-access/appconf";

const MAX_LATEST_ARTICLES = 4;
const MAX_RESEARCH_ARTICLES = 6;

export const AppConfig: GlobalConfig = {
  slug: "appconf",
  label: "App Configuration",
  access: {
    read: all,
    update: admin,
  },
  admin: {
    meta: {
      title: "App Configuration",
    },
  },
  hooks: {
    afterChange: [revalidateHomePage],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Main",
          fields: [
            {
              name: "appName",
              label: "App Name",
              required: true,
              defaultValue: "Acme Corporation",
              type: "text",
            },
            {
              name: "homePageActive",
              label: "Home Page Active",
              type: "checkbox",
              defaultValue: false,
            },
            {
              name: "landingPageArticles",
              label: "Landing Page Articles",
              type: "group",
              fields: [
                {
                  name: "heroPost",
                  label: "Hero Post",
                  type: "relationship",
                  relationTo: "posts",
                  required: true,
                },
                {
                  name: "featuredPosts",
                  label: "Featured Posts",
                  type: "relationship",
                  validate: (value, options) => {
                    console.log(value);
                    if (!value) return "Please select at least one post.";
                    if (
                      value.values.length > MAX_LATEST_ARTICLES ||
                      value.length > MAX_LATEST_ARTICLES
                    ) {
                      return `You can only select up to ${MAX_LATEST_ARTICLES} posts.`;
                    }
                    // for (const post of value as unknown as Post[]) {
                    //   console.log(post.status);
                    // }

                    return true;
                  },
                  hasMany: true,
                  relationTo: "posts",
                },
                {
                  name: "latestResearch",
                  label: "Latest Research",
                  type: "relationship",
                  validate: (value, options) => {
                    console.log(value);
                    if (!value) return "Please select at least one post.";
                    if (
                      value.values.length > MAX_RESEARCH_ARTICLES ||
                      value.length > MAX_RESEARCH_ARTICLES
                    ) {
                      return `You can only select up to ${MAX_RESEARCH_ARTICLES} posts.`;
                    }
                    return true;
                  },
                  hasMany: true,
                  relationTo: "posts",
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "favicon",
              label:
                "Favicon - There's no check on image size or type, so make sure it's small and of the correct type",
              required: true,
              type: "relationship",
              relationTo: "media",
            },
            SeoField,
          ],
        },
      ],
    },
  ],
} as const;
