import type {TCreatePost, TFilterPosts, TGetPostBySlug} from "~/data-access/dto/post.dto";
import {db} from "~/server/db";
import {createUniqueSlug} from "~/lib/slug";
import type {Post} from "../../prisma/generated";
import {tryCatch} from "~/lib/try-catch";

export type FCreatePost = (
    data: TCreatePost,
    userId: string,
) => Promise<void>;

export type FGetBySlug = (
    slug: TGetPostBySlug
) => Promise<Post>

export type FFilterPosts = (
    filters: TFilterPosts
) => Promise<Post[]>;

export const createPost: FCreatePost =async (
    data,
    userId,
) => {
    const {
        tags, slug, ...d
    } = data;

    const generatedSlug = await createUniqueSlug(
        db, d.title, slug
    )

    await db.post.create({
        data: {
            ...d,
            slug: generatedSlug,
            tags: {
                connect: tags.map(v => ({id: v}))
            },
            createdBy: {
                connect: {
                    id: userId,
                }
            }
        }
    })

};

export const getPostBySlug: FGetBySlug = async (
    slug
) => {
    const q = await tryCatch(db.post.findUnique({
        where: {
            slug,
        }
    }))

    if (q.error) throw new Error(`Couldn't get post by slug ${q.error}`)
    if (q.data === null) throw new Error(`Couldn't get post by slug ${q.error}`)
    return q.data;
}

