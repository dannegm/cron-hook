import 'dotenv/config';

import { Router } from 'express';
import mailgun from 'mailgun-js';

const router = Router();

const mail = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const asyncSend = data => {
    return new Promise((resolve, reject) => {
        mail.messages().send(data, (error, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
};

router.post('/notification', async (req, res) => {
    try {
        const result = await asyncSend({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.content,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
        });
    }
});

export default router;
