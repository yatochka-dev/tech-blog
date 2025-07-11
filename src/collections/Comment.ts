import type { CollectionConfig } from "payload";

export const Comment: CollectionConfig = {
  slug: "comments",
  fields: [
    {
      name: "author",
      label: "Author",
      type: "text",
      required: true,
    },

    {
      name: "content",
      type: "text",
      required: true,
      defaultValue: "Comment",
    },
    // {
    //   name: "replies",
    //   type: "relationship",
    //   relationTo: "comments",
    //   hasMany: true,
    // },
  ],
};
