
import {
    createTRPCRouter,
    protectedProcedure, publicProcedure,
} from "~/server/api/trpc";
import {createPostSchema, getPostBySlugSchema} from "~/data-access/dto/post.dto";
import {createPost, getPostBySlug} from "~/data-access/post";

export const postRouter = createTRPCRouter({


  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {

      return createPost(
          input, ctx.session.user.id
      )

    }),

    getBySlug: publicProcedure
        .input(getPostBySlugSchema)
        .mutation(async ({input}) => {
            return getPostBySlug(input)
        })

});
