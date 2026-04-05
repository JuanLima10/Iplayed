-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "avatar_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "igdb_id" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game_status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL,
    "last_played_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "game_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "game_status_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "stars" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "review_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game_list" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "game_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "list_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "list_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "list_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "game_list" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "list_item_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sync_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "last_sync" DATETIME NOT NULL,
    "device_id" TEXT,
    CONSTRAINT "sync_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
