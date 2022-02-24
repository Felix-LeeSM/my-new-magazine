const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const router = require('./routes/index.js');

const app = express();

const port = 3000;
const logger = (req, res, next) => {
    console.log('User request :', req.originalUrl, new Date());
    next();
};

app.use([
    logger,
    cors({
        origin: 'http:// frontend web page',
        optionsSuccessStatus: 200
    }),
    express.urlencoded(),
    express.json(),
    cookieParser()]);

app.use('/api', router);

app.listen(port, () => {
    console.log('port:', port, ', server on');
});

