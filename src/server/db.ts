import { PrismaClient } from "prisma/generated/client";
import { env } from "~/env";

export type TDatabaseClient = ReturnType<typeof createPrismaClient>
const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: TDatabaseClient | undefined;
};


export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
