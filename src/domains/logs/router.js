import { Router } from 'express';
import { getCronById } from '../crons/controller';
import { deleteLogById, flushLogs, getLogById, getLogsByCronId, pruneLogs } from './controller';

const router = Router();

router.get('/crons/:cronId/logs', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    const logs = await getLogsByCronId(cronId);

    return res.status(200).json({
        data: logs,
    });
});

// Delete all the logs
router.get('/crons/:cronId/logs/flush', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    const deletedLogs = await flushLogs(cronId);

    return res.status(200).json({
        data: {
            deletedLogs,
        },
    });
});

// Delete all the logs, keep last 10
router.get('/crons/:cronId/logs/prune', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    const deletedLogs = await pruneLogs(cronId);

    return res.status(200).json({
        data: {
            deletedLogs,
        },
    });
});

router.get('/logs/:logId', async (req, res) => {
    const logId = req.params.logId;
    const log = await getLogById(logId);

    if (!log) {
        return res.status(404).json({
            message: 'Log not found',
        });
    }

    return res.status(200).json({
        data: log,
    });
});

router.delete('/logs/:logId', async (req, res) => {
    const logId = req.params.logId;
    const log = await getCronById(logId);

    if (!log) {
        return res.status(404).json({
            message: 'Log not found',
        });
    }

    await deleteLogById(logId);

    return res.status(204);
});

export default router;
