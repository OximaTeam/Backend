/*
  Warnings:

  - A unique constraint covering the columns `[defaultApiId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('custom', 'mistral', 'openai');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "defaultApiId" TEXT;

-- CreateTable
CREATE TABLE "Api" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "provider" "ProviderType" NOT NULL,
    "providerUrl" TEXT,
    "modelId" TEXT,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_id_key" ON "Api"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_defaultApiId_key" ON "Users"("defaultApiId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_defaultApiId_fkey" FOREIGN KEY ("defaultApiId") REFERENCES "Api"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
