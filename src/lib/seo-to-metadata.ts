import type { Media } from "@payload-types";

interface SEO {
  metaTitle: string;
  metaDescription: string;
  canonicalURL?: string | null;
  noIndex?: boolean | null;
  openGraph?: {
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: number | null | Media;
  };
  twitterCard?: {
    twitterTitle?: string | null;
    twitterDescription?: string | null;
    twitterImage?: number | null | Media;
  };
}

export default function seoToMetadata(seo: SEO) {
  const ogImg =
    typeof seo.openGraph?.ogImage === "object"
      ? seo.openGraph.ogImage!
      : undefined;

  const twiterImg =
    typeof seo.twitterCard?.twitterImage === "object"
      ? seo.twitterCard.twitterImage!
      : undefined;

  return {
    title: seo.metaTitle ?? "Default Site Title",
    description: seo.metaDescription || "Default site description.",
    // icons: {
    //     icon: (appConfig.favicon as Media)?.url ?? "/favicon.ico",
    // },
    robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: seo.canonicalURL || undefined,
    },
    openGraph: {
      title: seo.openGraph?.ogTitle || seo.metaTitle,
      description: seo.openGraph?.ogDescription || seo.metaDescription,
      images: !!ogImg ? [{ url: ogImg.url ?? "" }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterCard?.twitterTitle || seo.metaTitle,
      description: seo.twitterCard?.twitterDescription || seo.metaDescription,
      images: !!twiterImg ? [{ url: twiterImg.url ?? "" }] : [],
    },
  };
}
