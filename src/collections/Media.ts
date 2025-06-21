import type { CollectionConfig } from "payload";
import * as path from "node:path";
import all from "~/access/all";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: all,
  },
  upload: {
    // only png, jpg, webp and ico
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/x-icon",
      "image/vnd.microsoft.icon",
      "image/vnd",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      defaultValue: "Image of a green elephant",
    },
  ],
};
