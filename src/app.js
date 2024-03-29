import cronRouter from './domains/crons/router.js';

const port = process.env.PORT || 3000;

const App = app => {
    console.log('Mounting server...');

    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.all('/test(/:status?)', (req, res) => {
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

    app.use('/api', cronRouter);

    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
};

export default App;
