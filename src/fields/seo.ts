import type { Field } from "payload";

export const SeoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: {
    description: "Search engine optimization settings",
  },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Title",
      required: true,
      maxLength: 60,
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta Description",
      required: true,
      maxLength: 160,
    },
    {
      name: "canonicalURL",
      type: "text",
      label: "Canonical URL",
      admin: {
        placeholder: "https://example.com/page-slug",
      },
    },
    {
      name: "noIndex",
      type: "checkbox",
      label: "Prevent indexing (robots noindex)",
      defaultValue: false,
    },
    {
      name: "openGraph",
      type: "group",
      label: "Open Graph (Facebook / Social sharing)",
      fields: [
        {
          name: "ogTitle",
          type: "text",
          label: "OG Title",
        },
        {
          name: "ogDescription",
          type: "textarea",
          label: "OG Description",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media", // make sure you have a media collection
          label: "OG Image",
        },
      ],
    },
    {
      name: "twitterCard",
      type: "group",
      label: "Twitter Card",
      fields: [
        {
          name: "twitterTitle",
          type: "text",
          label: "Twitter Title",
        },
        {
          name: "twitterDescription",
          type: "textarea",
          label: "Twitter Description",
        },
        {
          name: "twitterImage",
          type: "upload",
          relationTo: "media",
          label: "Twitter Image",
        },
      ],
    },
  ],
};
