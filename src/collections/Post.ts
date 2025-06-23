import type { CollectionConfig } from "payload";
import slugify from "slugify";
import { SeoField } from "~/fields/seo";
import { revalidateHomePage } from "~/data-access/appconf";

export const Posts: CollectionConfig = {
  slug: "posts",
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if (data.title) {
          const title: string = data.title as unknown as string;
          // Generate slug from title (lowercase, hyphenated)
          data.slug = slugify(title, { lower: true, strict: true });
        }
        return data;
      },
    ],
    afterChange: [revalidateHomePage],
    afterDelete: [revalidateHomePage],
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
              admin: {
                readOnly: true,
                hidden: true,
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
