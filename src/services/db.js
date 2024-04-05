import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const CronSchema = prisma.cron;
export const LogSchema = prisma.log;
