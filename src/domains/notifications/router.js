import 'dotenv/config';

import { Router } from 'express';
import { Resend } from 'resend';
import { v4 as uuid } from 'uuid';

import NotificationEmail from '@/emails/notification';

const router = Router();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

const SENDER_EMAIL = 'CronHook <no-reply@mail.hckr.mx>';

const extractUserData = userEmail => {
    const regex = /(.+?) <(.+?)>/;
    const match = userEmail.match(regex);

    if (!match) {
        return null;
    }

    return { name: match[1], email: match[2] };
};

router.post('/notification', async (req, res) => {
    const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        react: NotificationEmail({
            user: extractUserData(req.body.to),
            subject: req.body.subject,
            content: req.body.content,
            icon: req.body.icon,
            action: {
                href: req.body?.action?.href,
                label: req.body?.action?.label,
            },
        }),
        headers: {
            'X-Entity-Ref-ID': uuid(),
        },
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
