/*
  Warnings:

  - Made the column `modelId` on table `Api` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apiKey` on table `Api` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Api" ALTER COLUMN "modelId" SET NOT NULL,
ALTER COLUMN "apiKey" SET NOT NULL;
