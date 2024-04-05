import { startJob } from './services/cron.js';
import { startServer } from './services/http.js';


const start = () => {
    // startJob();
    startServer();
};

start();
