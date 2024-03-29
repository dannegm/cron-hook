import { Cron } from 'croner';
import { setMilliseconds } from 'date-fns';
import { executeById, getCronsByNextRun, regenNextRun } from '@/domains/crons/controller.js';

const getCronsAndExecute = async runDate => {
    const found = await getCronsByNextRun(runDate);

    found.forEach(async i => {
        await executeById(i.id);
    });
};

const runner = async () => {
    console.log(`[TICK] ${Date.now()}`);
    const runDate = setMilliseconds(new Date(), 0);
    await getCronsAndExecute(runDate);
};

const cronOptions = {
    paused: true,
};

const cronJob = Cron('* * * * * *', cronOptions, runner);

export const startJob = async () => {
    console.log('Starting job...');
    await regenNextRun();
    cronJob.resume();
};
