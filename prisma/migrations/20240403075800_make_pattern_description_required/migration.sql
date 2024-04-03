/*
  Warnings:

  - Made the column `patternDescription` on table `Cron` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cron" ALTER COLUMN "patternDescription" SET NOT NULL,
ALTER COLUMN "patternDescription" DROP DEFAULT;
