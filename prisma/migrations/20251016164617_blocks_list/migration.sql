/*
  Warnings:

  - The `content` column on the `Blocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Blocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blocks" DROP COLUMN "content",
ADD COLUMN     "content" JSONB,
ALTER COLUMN "processed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "blocksList" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Blocks_id_key" ON "Blocks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_id_key" ON "Folders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_id_key" ON "Notes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
