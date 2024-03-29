import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import server from './app.js';
import { startJob } from './services/cron.js';

const app = express();

app
    // ...
    .use(cors())
    .use(morgan(':method :url :status :response-time ms - ":user-agent"'))
    .use(bodyParser.json());

const start = () => {
    // startJob();
    server(app);
};

start();
