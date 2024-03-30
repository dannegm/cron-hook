import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import cronsRouter from '@/domains/crons/router.js';
import logsRouter from '@/domains/logs/router.js';
import notificationsRouter from '@/domains/notifications/router.js';
import testRouter from '@/domains/test/router.js';

const PORT = process.env.PORT || 3000;
const APP_SECRET = process.env.APP_SECRET || 3000;

const app = express();

app
    // ...
    .use(cors())
    .use(morgan(':method :url :status :response-time ms - ":user-agent"'))
    .use(bodyParser.json());

const authMiddleware = (req, res, next) => {
    const token = req.headers?.authorization;

    if (!token || !token.includes(token)) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    return next();
};

const startApp = app => {
    console.log('Mounting server...');

    app.get('/', (req, res) => {
        res.send('OK');
    });

    app.use('/api', authMiddleware, cronsRouter);
    app.use('/api', authMiddleware, logsRouter);
    app.use('/api', authMiddleware, notificationsRouter);
    app.use('/api', authMiddleware, testRouter);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
};

export const startServer = () => {
    startApp(app);
};
