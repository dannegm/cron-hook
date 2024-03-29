import { Cron } from 'croner';

export const getNextRun = ({ pattern, firstRun = undefined }) => {
    const cronJob = Cron(pattern, { startAt: firstRun });
    const nextRun = cronJob.nextRun();
    cronJob.stop();
    return nextRun;
};

export const buildUrl = ({ baseUrl, query }) => {
    const url = new URL(baseUrl);

    const params = new URLSearchParams(url.search);

    Object.entries(query).forEach(([key, value]) => {
        params.append(key, value);
    });

    url.search = params.toString();

    return url.href;
};

export const getContent = ({ headers = {}, data = undefined } = {}) => {
    const headerContentType = headers?.['content-type'] || 'text/plain';
    const [contentType] = headerContentType.split(';');

    const content = {
        'application/json': JSON.stringify(data),
    };

    return {
        type: contentType,
        body: content[contentType] || `${data}`,
    };
};
