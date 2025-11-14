-- CreateTable
CREATE TABLE "charts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "birth_data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "charts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpret_messages" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interpret_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "charts_user_id_idx" ON "charts"("user_id");

-- CreateIndex
CREATE INDEX "charts_created_at_idx" ON "charts"("created_at");

-- CreateIndex
CREATE INDEX "interpret_messages_user_id_idx" ON "interpret_messages"("user_id");

-- CreateIndex
CREATE INDEX "interpret_messages_created_at_idx" ON "interpret_messages"("created_at");

-- AddForeignKey
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpret_messages" ADD CONSTRAINT "interpret_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
