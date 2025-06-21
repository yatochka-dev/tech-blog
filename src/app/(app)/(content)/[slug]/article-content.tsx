import type { Post } from "@payload-types";
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import Image from "next/image";
import type { FC } from "react";

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
      return `/#idk-how-to-link-to-that`;
  }
};

const CustomUploadComponent: FC<{
  node: SerializedUploadNode;
}> = ({ node }) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") {
      return null;
    }
    const { alt, height, url, width } = uploadDoc;
    return (
      <Image
        alt={alt}
        height={height ?? undefined}
        src={url ?? "#"}
        width={width ?? undefined}
        data-test="hello"
      />
    );
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => {
  return {
    ...defaultConverters,
    upload: CustomUploadComponent,

    ...LinkJSXConverter({ internalDocToHref }),
  };
};

export default function ArticleContent({ post }: ArticleContentProps) {
  const content = post.content;
  return (
    <div className="prose prose-lg max-w-none">
      {/*<pre>{JSON.stringify(content.root.children, null, 2)}</pre>*/}

      <RichText data={content} converters={jsxConverters} />
    </div>
  );
}
