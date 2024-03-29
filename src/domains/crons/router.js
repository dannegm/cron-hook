import { Router } from 'express';

import {
    // ...
    listCrons,
    createCron,
    getCronById,
    updateCronById,
    deleteCronById,
    executeById,
} from './controller.js';

const router = Router();

router.get('/crons', async (req, res) => {
    const crons = await listCrons();
    return res.status(200).json({
        data: crons,
    });
});

router.post('/crons', async (req, res) => {
    const cron = await createCron(req.body);
    return res.status(201).json({
        data: cron,
    });
});

router.get('/crons/:cronId', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    return res.status(200).json({
        data: cron,
    });
});

router.put('/crons/:cronId', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    const updated = await updateCronById(cronId, req.body);

    return res.status(200).json({
        data: updated,
    });
});

router.delete('/crons/:cronId', async (req, res) => {
    const cronId = req.params.cronId;
    const cron = await getCronById(cronId);

    if (!cron) {
        return res.status(404).json({
            message: 'Cron not found',
        });
    }

    await deleteCronById(cronId);

    return res.status(204);
});

router.get('/crons/:cronId/trigger', async (req, res) => {
    const cronId = req.params.cronId;

    const result = await executeById(cronId);

    return res.status(200).json({
        data: result,
    });
});

export default router;
