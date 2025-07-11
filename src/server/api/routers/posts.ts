import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import payload from "~/data-access";
import type { Where } from "payload";

export const postRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        tags: z
          .array(z.union([z.string(), z.number()]))
          .transform((ids) => ids.map((id) => Number(id))),
        // dateRange: z
        //   .object({
        //     from: z.date(),
        //     to: z.date().optional(),
        //   })
        //   .nullable()
        //   .refine(
        //     (data) => {
        //       if (!data) return true;
        //       if (!data.to) return true;
        //       return data.from <= data.to;
        //     },
        //     {
        //       message: "From date must be before or equal to To date",
        //       path: ["from"],
        //     },
        //   ),

        limit: z.number().min(1).max(100).default(10),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ input }) => {
      const p = await payload();
      const w: Where = {};

      // if (input.dateRange) {
      //   w.created_at = {
      //     greater_than_equal: input.dateRange.from,
      //     less_than_equal: input.dateRange.to,
      //   };
      // }
      if (input.tags.length > 0) {
        w.and = [
          {
            or: input.tags.map((tagId) => ({
              tags: {
                contains: tagId,
              },
            })),
          },
        ];
      }

      if (input.query) {
        w.title = {
          like: input.query.toLowerCase(),
        };
      }

      return await p.find({
        collection: "posts",
        limit: input.limit,
        page: input.page,
        where: w,
        sort: ["created_at"],
      });
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
            like: !!input.search ? input.search.toLowerCase() : "",
          },
        },
      });

      return tags.docs;
    }),
  getFirstPublishedPost: publicProcedure.query(async () => {
    const p = await payload();

    const post = await p.find({
      collection: "posts",
      limit: 1,
      where: {
        visible: {
          equals: true,
        },
      },
      sort: ["created_at"],
    });
    console.log(post);

    if (!post) {
      return new Date();
    }

    const first = post.docs[0];

    return !!first ? new Date(first.createdAt) : new Date();
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
