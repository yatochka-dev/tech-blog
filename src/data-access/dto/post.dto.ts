import { z } from "zod";
import type {PostStatus} from "../../../prisma/generated/enums";

const postStatuses = [
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED"
] satisfies PostStatus[];

const postTitle = z.string()
    .min(1)
    .max(255)
    .trim()
    .refine(v => v.replace(/\s+/g, ' ').trim() === v, {
        message: "Title should not have multiple spaces in a row"
    });
const postSlug = z.string().min(1).max(300);
const postDescription = z.string().max(400).optional();
const postContent = z.string().min(1);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const postStatus = z.enum([
    ...postStatuses
] as string[]).transform(
    v => v as PostStatus
)

const postImage = z.string().url().optional();
const postTags = z.string().cuid().array();
export const createPostSchema = z.object({
    title: postTitle,
    slug: postSlug.nullable(),
    description: postDescription,
    content: postContent,
    status: postStatus,
    image: postImage,
    tags: postTags,

})
export type TCreatePost = z.infer<typeof createPostSchema>;



export const getPostBySlugSchema = postSlug;
export type TGetPostBySlug = z.infer<typeof getPostBySlugSchema>;


export const filterPostsSchema = z.object({
    search: z.string().nullable(),

})
export type TFilterPosts = z.infer<typeof filterPostsSchema>