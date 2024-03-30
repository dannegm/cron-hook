import 'dotenv/config';

import { Router } from 'express';
import { Resend } from 'resend';

const router = Router();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

router.post('/notification', async (req, res) => {
    const { data, error } = await resend.emails.send({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.content,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            error,
        });
    }

    return res.status(200).json({
        success: true,
        data,
    });
});

export default router;
