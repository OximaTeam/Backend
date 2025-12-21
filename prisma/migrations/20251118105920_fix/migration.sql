/*
  Warnings:

  - The values [oxima] on the enum `ProviderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProviderType_new" AS ENUM ('custom', 'mistral', 'openai');
ALTER TABLE "Api" ALTER COLUMN "provider" TYPE "ProviderType_new" USING ("provider"::text::"ProviderType_new");
ALTER TYPE "ProviderType" RENAME TO "ProviderType_old";
ALTER TYPE "ProviderType_new" RENAME TO "ProviderType";
DROP TYPE "public"."ProviderType_old";
COMMIT;
