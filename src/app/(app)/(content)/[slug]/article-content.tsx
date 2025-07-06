import type { Post } from "@payload-types";
import {
  type JSXConverter,
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import Image from "next/image";
import { type FC, Fragment } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";

interface ArticleContentProps {
  post: Post;
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug as string;

  switch (relationTo) {
    case "posts":
      return `/${slug}`;
    default:
      return `/#link-error`;
  }
};

const CustomUploadComponent: JSXConverter<SerializedUploadNode> = ({
  node,
}) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") return null;

    const { alt, height, url, width } = uploadDoc;
    return (
      <Image
        alt={alt}
        height={height ?? undefined}
        width={width ?? undefined}
        src={url ?? "#"}
        className="my-4"
      />
    );
  }

  return null;
};

const CustomLinkComponent: JSXConverter<SerializedLinkNode> = ({
  node,
  converters,
  nodesToJSX,
}) => {
  if (node.type !== "link") return null;
  const href =
    node.fields.linkType === "custom"
      ? (node.fields.url ?? "/#")
      : internalDocToHref({ linkNode: node });

  const newTab = node.fields.newTab;

  return (
    <Link
      dir={node.direction ?? undefined}
      href={href}
      className={cn(
        "text-blue-400 underline transition duration-75 hover:text-blue-600",
      )}
      target={newTab ? "_blank" : "_self"}
      rel={node?.fields?.rel?.toString().replace(/,/g, " ") ?? undefined}
    >
      {nodesToJSX({
        converters: converters,
        parent: this,
        nodes: node.children,
      })}
    </Link>
  );
};

import type { SerializedQuoteNode } from "@payloadcms/richtext-lexical";

const CustomBlockquoteComponent: JSXConverter<SerializedQuoteNode> = ({
  nodesToJSX,
  node,
  converters,
}) => {
  return (
    <blockquote className="text-muted-foreground my-3 border-l-3 border-gray-300 pl-3 italic">
      {nodesToJSX({
        converters,
        nodes: node.children,
        parent: this,
      })}
    </blockquote>
  );
};

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: CustomUploadComponent,
  link: CustomLinkComponent,
  quote: CustomBlockquoteComponent,
});

export default function ArticleContent({ post }: ArticleContentProps) {
  const content = post.content;

  return (
    <div className="prose prose-lg max-w-none">
      <RichText data={content} converters={jsxConverters} />
    </div>
  );
}
