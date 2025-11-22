-- AlterTable
ALTER TABLE "interpret_messages" ADD COLUMN     "chart_id" UUID;

-- CreateIndex
CREATE INDEX "interpret_messages_chart_id_idx" ON "interpret_messages"("chart_id");

-- AddForeignKey
ALTER TABLE "interpret_messages" ADD CONSTRAINT "interpret_messages_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "charts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
