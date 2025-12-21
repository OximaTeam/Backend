-- AlterEnum
ALTER TYPE "ProviderType" ADD VALUE 'oxima';

-- AlterTable
ALTER TABLE "Api" ALTER COLUMN "modelId" DROP NOT NULL,
ALTER COLUMN "apiKey" DROP NOT NULL;
