// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { z } from "zod";
// import payload from "~/data-access";
//
// export const authRouter = createTRPCRouter({
//   register: publicProcedure
//     .input(
//       z.object({
//         email: z.string().email(),
//         name: z.string(),
//         username: z.string(),
//       }),
//     )
//     .mutation(async ({ input }) => {
//       const payld = await payload();
//
//       const res = await payld.create({
//         collection: "users",
//         data: {
//           ...input,
//           isAdmin: false,
//         },
//         disableVerificationEmail: true,
//       });
//
//       return res;
//     }),
// });
