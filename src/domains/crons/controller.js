import axios from 'axios';
import { setMilliseconds } from 'date-fns';
import { CronSchema } from '@/services/db.js';
import { buildUrl, getContent, getNextRun } from '@/helpers/utils';

import { createLog, pruneLogs } from '../logs/controller';

export const listCrons = async () => {
    const list = await CronSchema.findMany();
    return list;
};

export const createCron = async data => {
    const nextRun = getNextRun(data);

    const created = await CronSchema.create({
        data: {
            ...data,
            nextRun: setMilliseconds(nextRun, 0),
        },
    });
    return created;
};

export const getCronById = async cronId => {
    const found = await CronSchema.findUnique({
        where: {
            id: cronId,
        },
    });

    return found;
};

export const updateCronById = async (cronId, data) => {
    const found = await CronSchema.update({
        where: {
            id: cronId,
        },
        data,
    });

    return found;
};

export const deleteCronById = async cronId => {
    const found = await CronSchema.delete({
        where: {
            id: cronId,
        },
    });

    return found;
};

export const getCronsByNextRun = async nextRun => {
    const found = await CronSchema.findMany({
        where: {
            AND: [{ nextRun }, { active: true }],
        },
    });

    return found;
};

export const regenNextRun = async () => {
    const found = await CronSchema.findMany({
        where: {
            active: true,
        },
    });

    found.forEach(async item => {
        const nextRun = getNextRun(item);
        await CronSchema.update({
            where: {
                id: item.id,
            },
            data: {
                nextRun,
            },
        });
    });
};

export const executeById = async cronId => {
    const found = await getCronById(cronId);

    const startTime = Date.now();

    if (!found) {
        return false;
    }

    const nextRun = getNextRun(found);

    await updateCronById(cronId, {
        nextRun,
        lastRun: new Date(startTime),
    });

    const headers = found.headers || {};
    const params = found.params || {};
    const data = found.body ? JSON.parse(found.body) : undefined;

    try {
        const response = await axios({
            data,
            method: found.method.toLowerCase(),
            url: buildUrl({
                baseUrl: found.hook,
                query: {
                    time: Date.now(),
                    ...params,
                },
            }),
            headers: {
                ...headers,
                'user-agent': `${process.env.npm_package_name}/${process.env.npm_package_version}`,
            },
        });

        const content = getContent(response);

        const logged = await createLog({
            cronId,
            executedAt: new Date(startTime),
            status: response?.status,
            headers: response?.headers || {},
            contentType: content.type,
            response: content.body,
        });

        return logged;
    } catch (err) {
        const content = getContent(err);

        const logged = await createLog({
            cronId,
            executedAt: new Date(startTime),
            status: err?.status || 500,
            headers: err?.headers || {},
            contentType: content.type,
            response: content.body,
        });

        return logged;
    } finally {
        await pruneLogs(cronId);
    }
};
