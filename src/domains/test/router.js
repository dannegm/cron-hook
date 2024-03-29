import { Router } from 'express';

const router = Router();

router.all('/test(/:status?)', (req, res) => {
    const method = req.method;
    const headers = req.headers;
    const params = req.query;
    const body = req.body;
    const status = Number(req.params.status) || 200;

    res.status(status).json({
        data: {
            status,
            method,
            headers,
            params,
            body,
        },
    });
});

export default router;
