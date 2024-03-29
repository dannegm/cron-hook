import { LogSchema } from '@/services/db';

const MAX_LOGS_PER_CRON = 20;

export const createLog = async data => {
    const created = await LogSchema.create({ data });
    return created;
};

export const pruneLogs = async cronId => {
    const toDelete = await LogSchema.findMany({
        select: {
            id: true,
        },
        where: { cronId },
        orderBy: { executedAt: 'desc' },
    });

    const logsToDelete = toDelete
        .filter((_, index) => index >= MAX_LOGS_PER_CRON)
        .map(i => i.id);

    if (!logsToDelete.length) {
        return;
    }

    const deletedRecords = await LogSchema.deleteMany({
        where: {
            id: {
                in: logsToDelete,
            },
        },
    });

    return deletedRecords.count;
};
