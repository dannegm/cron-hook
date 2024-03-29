-- CreateEnum
CREATE TYPE "HttpMethods" AS ENUM ('GET', 'POST', 'UPDATE', 'DELETE', 'PATCH');

-- CreateTable
CREATE TABLE "Cron" (
    "id" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "hook" TEXT NOT NULL,
    "method" "HttpMethods" NOT NULL DEFAULT 'GET',
    "authorization" TEXT,
    "headers" JSONB,
    "params" JSONB,
    "body" TEXT,
    "firstRun" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastRun" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cron_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "cronId" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "headers" JSONB NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_cronId_fkey" FOREIGN KEY ("cronId") REFERENCES "Cron"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
