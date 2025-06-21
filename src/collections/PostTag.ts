import type { CollectionConfig } from "payload";
import all from "~/access/all";
import admin from "~/access/admin";

export const PostTag: CollectionConfig = {
  slug: "posttags",
  access: {
    read: all,
    create: admin,
    update: admin,
    delete: admin,
  },
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
