import type { CollectionConfig } from "payload";
import slugify from "slugify";
import cuid from "cuid";
import { SeoField } from "~/fields/seo";
import { APP_CONFIG_CACHE_TAG } from "~/data-access/appconf";
import { revalidateTag } from "next/cache";
import { fetchDraftPost } from "~/app/(app)/(content)/[slug]/fetch-post";
import { env } from "~/env";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    livePreview: {
      url: async (args) => {
        const post = await fetchDraftPost(args.data.id as string, true);

        if (!post) return env.NEXT_PUBLIC_APP_URL;

        const slug = post.slug;
        if (!slug) {
          return env.NEXT_PUBLIC_APP_URL;
        }
        return `${env.NEXT_PUBLIC_APP_URL}/${slug}/preview`;
      },
    },
  },
  versions: {
    maxPerDoc: 0,
    drafts: {
      schedulePublish: true,
      autosave: {
        showSaveDraftButton: false,
        interval: 150,
      },
      validate: true,
    },
  },
  hooks: {
    /**
     * Hook that generates a unique slug for posts before creation or title update
     *
     * @param {Object} params - Hook parameters
     * @param {Object} params.data - The current document data being changed
     * @param {Object} params.originalDoc - The original document data before changes
     * @param {string} params.operation - The type of operation (create/update)
     *
     * @returns {Object} Modified document data with generated slug
     *
     * @description
     * This hook ensures each post has a unique URL-friendly slug by:
     * 1. Checking if this is a new post creation or title update
     * 2. Generating a slug from the title using slugify
     * 3. Appending a random 6-character suffix to ensure uniqueness
     * 4. Returning the modified data with the new slug
     */
    beforeChange: [
      ({ data, operation, req }) => {
        if (!data) return data;
        if (operation === "create") {
          const title: string = data.title as unknown as string;

          // Generate slug from title (lowercase, hyphenated)
          const baseSlug = slugify(title, { lower: true, strict: true });
          // Use cuid for a globally unique identifier
          data.slug = `${baseSlug}-${cuid()}`;
        }

        const user = req.user?.id;

        if (!user) {
          throw new Error("You need to be logged in to create a post");
        }

        if (operation === "create" && !data.author) {
          data.author = user;
        }

        return data;
      },
    ],
    afterChange: [() => revalidateTag(APP_CONFIG_CACHE_TAG)],
    afterDelete: [() => revalidateTag(APP_CONFIG_CACHE_TAG)],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "META",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "text",
              required: true,
            },
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: "Article",
                  value: "ARTICLE",
                },
                {
                  label: "Research",
                  value: "RESEARCH",
                },
                {
                  label: "News",
                  value: "NEWS",
                },
              ],
              required: true,
              defaultValue: "ARTICLE",
            },
            {
              name: "cover",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "users",
              required: true,
              admin: {
                readOnly: true,
              },
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "posttags",
              hasMany: true,
            },
            {
              name: "visible",
              type: "checkbox",
              defaultValue: false,
              required: true,
              admin: {
                description:
                  "Needed when the article is still being written or should be hidden.",
              },
            },
            // {
            //   name: "comments",
            //   type: "relationship",
            //   relationTo: "comments",
            //   hasMany: true,
            //   admin: {
            //     hidden: true,
            //   },
            // },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              access: {
                update: () => false,
              },
              admin: {
                position: "sidebar",
              },
            },
          ],
        },
        { label: "SEO", fields: [SeoField] },
        {
          label: "CONTENT",
          fields: [
            {
              name: "content",
              type: "richText",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
