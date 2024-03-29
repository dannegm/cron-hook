import { Router } from 'express';

import {
    // ...
    listCrons,
    createCron,
    getCronById,
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

    return res.status(201).json({
        data: cron,
    });
});

export default router;
