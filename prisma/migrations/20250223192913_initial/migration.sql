-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "email" TEXT NOT NULL,
    "full_name" VARCHAR(50),
    "phone_number" VARCHAR(16),
    "date_of_birth" DATE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_sections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "section_title" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "site_sections_id_key" ON "site_sections"("id");

-- CreateIndex
CREATE UNIQUE INDEX "site_sections_title_key" ON "site_sections"("title");

-- CreateIndex
CREATE UNIQUE INDEX "settings_id_key" ON "settings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "settings_section_title_key_key" ON "settings"("section_title", "key");

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_section_title_fkey" FOREIGN KEY ("section_title") REFERENCES "site_sections"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
