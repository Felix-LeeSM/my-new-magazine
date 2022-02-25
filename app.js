const express = require('express');
const cors = require('cors')
const router = require('./routes/index.js');

const app = express();

const { sequelize } = require('./models'); // // 실시간으로 sequelize table 생성 확인 sequelize.sync();
sequelize.sync()
    .then(() => {
        console.log('db 연결');
    })
    .catch((err) => {
        console.log('db 연결 실패');
        console.error(err);
    });

const port = 3000;
const logger = (req, res, next) => {
    console.log('User request :', req.originalUrl, new Date());
    next();
};

app.use([
    cors(),
    logger,
    express.urlencoded(),
    express.json()]);

app.use('/api', router);



app.listen(port, () => {
    console.log('port:', port, ', server on');
});


module.exports = app;