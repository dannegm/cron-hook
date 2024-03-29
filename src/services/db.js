import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CronSchema = prisma.cron;
export const LogSchema = prisma.log;
