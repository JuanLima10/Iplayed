/*
  Warnings:

  - You are about to drop the column `stars` on the `review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,game_id]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "stars";

-- CreateIndex
CREATE UNIQUE INDEX "review_user_id_game_id_key" ON "review"("user_id", "game_id");
