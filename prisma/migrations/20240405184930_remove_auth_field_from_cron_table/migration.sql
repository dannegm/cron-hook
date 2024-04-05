/*
  Warnings:

  - You are about to drop the column `authorization` on the `Cron` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cron" DROP COLUMN "authorization";
