/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "feed_event_type" AS ENUM ('REVIEW_CREATED', 'REVIEW_UPDATED', 'STATUS_UPDATED', 'LIST_CREATED', 'LIST_ITEM_ADDED');

-- AlterTable
ALTER TABLE "game_list" ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_event" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "feed_event_type" NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "follow_follower_id_idx" ON "follow"("follower_id");

-- CreateIndex
CREATE INDEX "follow_following_id_idx" ON "follow"("following_id");

-- CreateIndex
CREATE UNIQUE INDEX "follow_follower_id_following_id_key" ON "follow"("follower_id", "following_id");

-- CreateIndex
CREATE INDEX "review_like_review_id_idx" ON "review_like"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_like_user_id_review_id_key" ON "review_like"("user_id", "review_id");

-- CreateIndex
CREATE INDEX "feed_event_user_id_created_at_idx" ON "feed_event"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_like" ADD CONSTRAINT "review_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_like" ADD CONSTRAINT "review_like_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_event" ADD CONSTRAINT "feed_event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
