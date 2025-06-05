-- CreateEnum
CREATE TYPE "ConfigValueType" AS ENUM ('STRING', 'BOOLEAN', 'NUMBER', 'JSON');

-- CreateTable
CREATE TABLE "ConfigEntry" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "ConfigValueType" NOT NULL,

    CONSTRAINT "ConfigEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfigEntry_key_key" ON "ConfigEntry"("key");

-- CreateIndex
CREATE INDEX "ConfigEntry_key_idx" ON "ConfigEntry"("key");
