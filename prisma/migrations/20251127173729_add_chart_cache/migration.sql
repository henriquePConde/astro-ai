-- AlterTable
ALTER TABLE "charts" ADD COLUMN     "calculated_at" TIMESTAMP(3),
ADD COLUMN     "calculated_data" JSONB;
