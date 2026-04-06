-- CreateEnum
CREATE TYPE "progress_status" AS ENUM ('TO_PLAY', 'PLAYING', 'COMPLETED', 'ABANDONED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,
    "email" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "igdb_id" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_status" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "status" "progress_status" NOT NULL,
    "progress" INTEGER,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION,
    "last_played_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "game_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "stars" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_list" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "game_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_item" (
    "id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_metadata" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_sync" TIMESTAMP(3) NOT NULL,
    "device_id" TEXT,

    CONSTRAINT "sync_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_provider_provider_id_key" ON "user"("provider", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_igdb_id_key" ON "game"("igdb_id");

-- CreateIndex
CREATE INDEX "game_title_idx" ON "game"("title");

-- CreateIndex
CREATE INDEX "game_status_user_id_idx" ON "game_status"("user_id");

-- CreateIndex
CREATE INDEX "game_status_game_id_idx" ON "game_status"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_status_user_id_game_id_key" ON "game_status"("user_id", "game_id");

-- CreateIndex
CREATE INDEX "review_user_id_idx" ON "review"("user_id");

-- CreateIndex
CREATE INDEX "review_game_id_idx" ON "review"("game_id");

-- CreateIndex
CREATE INDEX "game_list_user_id_name_idx" ON "game_list"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "game_list_user_id_name_key" ON "game_list"("user_id", "name");

-- CreateIndex
CREATE INDEX "list_item_list_id_idx" ON "list_item"("list_id");

-- CreateIndex
CREATE INDEX "list_item_game_id_idx" ON "list_item"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_item_list_id_game_id_key" ON "list_item"("list_id", "game_id");

-- CreateIndex
CREATE UNIQUE INDEX "sync_metadata_user_id_device_id_key" ON "sync_metadata"("user_id", "device_id");

-- AddForeignKey
ALTER TABLE "game_status" ADD CONSTRAINT "game_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_status" ADD CONSTRAINT "game_status_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_list" ADD CONSTRAINT "game_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "game_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_metadata" ADD CONSTRAINT "sync_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
