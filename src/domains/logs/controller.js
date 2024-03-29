import { LogSchema } from '@/services/db';

const MAX_LOGS_PER_CRON = 20;

export const getLogsByCronId = async cronId => {
    const list = await LogSchema.findMany({
        where: {
            cronId,
        },
        orderBy: {
            executedAt: 'desc',
        },
    });
    return list;
};

export const createLog = async data => {
    const created = await LogSchema.create({ data });
    return created;
};

export const getLogById = async logId => {
    const found = await LogSchema.findUnique({
        where: {
            id: logId,
        },
    });

    return found;
};

export const deleteLogById = async logId => {
    const found = await LogSchema.delete({
        where: {
            id: logId,
        },
    });

    return found;
};

export const pruneLogs = async cronId => {
    const toDelete = await LogSchema.findMany({
        select: {
            id: true,
        },
        where: { cronId },
        orderBy: { executedAt: 'desc' },
    });

    const logsToDelete = toDelete.filter((_, index) => index >= MAX_LOGS_PER_CRON).map(i => i.id);

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

export const flushLogs = async cronId => {
    const deletedRecords = await LogSchema.deleteMany({
        where: {
            cronId,
        },
    });

    return deletedRecords.count;
};
