import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import payload from "~/data-access";
import { TRPCError } from "@trpc/server";
import { type Comment } from "@payload-types";

export interface CommentWithComments extends Comment {
  subcomments: CommentWithComments[] | null | undefined;
}

export const postRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        tags: z
          .array(z.union([z.string(), z.number()]))
          .transform((ids) => ids.map((id) => Number(id))),

        limit: z.number().min(1).max(100).default(10),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ input }) => {
      const p = await payload();
      const posts = await p.find({
        collection: "posts",
        limit: input.limit,
        page: input.page,
        where: {
          title: {
            contains: input.query,
          },
          and: [
            {
              or: input.tags.map((tagId) => ({
                tags: {
                  contains: tagId,
                },
              })),
            },
          ],
        },
      });

      return posts;
    }),
  getTags: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const p = await payload();
      const tags = await p.find({
        collection: "posttags",
        select: {
          label: true,
        },
        where: {
          label: {
            contains: input.search,
          },
        },
      });

      return tags.docs;
    }),
  // comments: publicProcedure
  //   .input(
  //     z.object({
  //       postId: z.number(),
  //     }),
  //   )
  //   .query(async ({ input }) => {
  //     const pyload = await payload();
  //
  //     const data = await pyload.find({
  //       collection: "posts",
  //       select: {
  //         comments: true,
  //       },
  //       where: {
  //         id: {
  //           equals: input.postId,
  //         },
  //       },
  //
  //       depth: 1000,
  //       limit: 1,
  //     });
  //
  //     const post = data.docs[0];
  //
  //     if (!post) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Post not found",
  //       });
  //     }
  //
  //     return (post.comments as unknown as CommentWithComments[]) ?? [];
  //   }),
  // addComment: publicProcedure
  //   .input(
  //     z.object({
  //       to: z.enum(["POST", "COMMENT"]),
  //       toId: z.string(),
  //       content: z.string(),
  //       authorId: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     return input;
  //   }),
});
