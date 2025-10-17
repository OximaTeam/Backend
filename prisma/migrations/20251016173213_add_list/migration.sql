-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "notesList" TEXT[] DEFAULT ARRAY[]::TEXT[];
