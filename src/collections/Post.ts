import type { CollectionConfig } from "payload";
import slugify from "slugify";
import { SeoField } from "~/fields/seo";
import { APP_CONFIG_CACHE_TAG } from "~/data-access/appconf";
import { revalidateTag } from "next/cache";
import type { Post } from "@payload-types";

export const Posts: CollectionConfig = {
  slug: "posts",
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
      ({ data, originalDoc, operation }) => {
        if (!data) return data;
        if (
          operation === "create" ||
          data.title != (originalDoc as { title: string }).title
        ) {
          const title: string = data.title as unknown as string;

          // random six chars
          const suffix = Math.random().toString(36).substring(7);
          // Generate slug from title (lowercase, hyphenated)
          data.slug =
            slugify(title, { lower: true, strict: true }) + `-${suffix}`;
        }
        return data;
      },
    ],
    afterChange: [
      () => revalidateTag(APP_CONFIG_CACHE_TAG),
      ({ previousDoc }) => {
        const id: number = (previousDoc as Post).id ?? "";
        console.log(id, previousDoc);
        revalidateTag(`POST-${id}`);
      },
    ],
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
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "posttags",
              hasMany: true,
            },
            {
              name: "status",
              type: "select",
              options: [
                {
                  label: "Draft",
                  value: "DRAFT",
                },
                {
                  label: "Published",
                  value: "PUBLISHED",
                },
                {
                  label: "Archived",
                  value: "ARCHIVED",
                },
              ],
              defaultValue: "DRAFT",
            },
            {
              name: "comments",
              type: "relationship",
              relationTo: "comments",
              hasMany: true,
              admin: {
                hidden: true,
              },
            },
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
