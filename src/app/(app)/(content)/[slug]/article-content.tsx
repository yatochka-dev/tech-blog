import type { Post } from "@payload-types";
import {
  type JSXConverter,
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type {
  DefaultNodeTypes,
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedQuoteNode,
  SerializedUploadNode,
  SerializedListNode,
  SerializedListItemNode,
} from "@payloadcms/richtext-lexical";
import Image from "next/image";
import { type JSX } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Checkbox } from "~/components/ui/checkbox";

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

const CustomHeadingComponent: JSXConverter<SerializedHeadingNode> = ({
  node,
  nodesToJSX,
  converters,
}) => {
  const HeadingTag = `${node.tag}` as keyof JSX.IntrinsicElements;

  function getClass(tag: typeof node.tag): string {
    switch (tag) {
      case "h1":
        return "text-5xl font-extrabold leading-tight";
      case "h2":
        return "text-4xl font-bold leading-snug";
      case "h3":
        return "text-3xl font-semibold leading-snug";
      case "h4":
        return "text-2xl font-medium leading-normal";
      case "h5":
        return "text-xl font-medium leading-relaxed";
      case "h6":
        return "text-lg font-medium leading-relaxed";
      default:
        return "text-4xl font-bold leading-snug"; // fallback
    }
  }

  return (
    <HeadingTag
      className={cn(
        "text-primary scroll-mt-20 text-xl font-bold tracking-tight",
        getClass(node.tag),
      )}
    >
      {nodesToJSX({
        converters,
        nodes: node.children,
        parent: node,
      })}
    </HeadingTag>
  );
};

const CustomListComponent: JSXConverter<SerializedListNode> = ({
  node,
  nodesToJSX,
  converters,
}) => {
  const listType = node.listType;
  const isOrdered = listType === "number";
  const isChecklist = listType === "check";
  const ListTag = isOrdered ? "ol" : "ul";

  const listClass = cn(
    "ml-6 pl-2 space-y-1",
    isChecklist ? "list-none" : isOrdered ? "list-decimal" : "list-disc",
  );

  return (
    <ListTag className={listClass}>
      {nodesToJSX({
        converters,
        nodes: node.children,
        parent: node,
      })}
    </ListTag>
  );
};

// const CustomTaskListItemComponent: JSXConverter<SerializedListItemNode> = ({
//   node,
//   nodesToJSX,
//   converters,
// }) => {
//   const isChecked = node.checked;
//
//   return (
//     <li className="flex items-start gap-2">
//       {isChecked !== undefined && (
//         <Checkbox checked={isChecked} disabled className="mt-1" />
//       )}
//       <span className={isChecked ? "text-muted-foreground line-through" : ""}>
//         {nodesToJSX({
//           converters,
//           nodes: node.children,
//           parent: node,
//         })}
//       </span>
//     </li>
//   );
// };

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: CustomUploadComponent,
  link: CustomLinkComponent,
  quote: CustomBlockquoteComponent,
  heading: CustomHeadingComponent,
  list: CustomListComponent,
  // listitem: CustomTaskListItemComponent,
});

export default function ArticleContent({ post }: ArticleContentProps) {
  const content = post.content;

  return (
    <div className="prose prose-lg max-w-none">
      <RichText data={content} converters={jsxConverters} />
    </div>
  );
}
