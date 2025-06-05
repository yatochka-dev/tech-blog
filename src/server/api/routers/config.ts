import { z } from "zod";
import { getConfigEntry, setConfigEntry } from "~/data-access/config";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const configRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {

      return getConfigEntry(input.key);
    }),

  set: protectedProcedure
    .input(z.object({ key: z.string(), value: z.union([z.string(), z.number(), z.boolean()]), type: z.enum([
        "STRING",
            "NUMBER",
            "BOOLEAN"
        ]) }))
    .mutation(async ({ input }) => {

      return setConfigEntry(input.key, input.value, input.type);
    }),
});

