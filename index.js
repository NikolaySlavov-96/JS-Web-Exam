const https = require('https');
const fs = require('fs');
const express = require('express');
const PORT_LISTEN = 3000;
const databaseConfig = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const routerConfig = require('./config/routerConfig');

/*
const options = {
    key: fs.readFileSync('../key-PRK.pem'),
    cert: fs.readFileSync('../cert-CRT.pem')
}
*/

start()

async function start() {
    const app = express();
    // https.createServer(options, app).listen(PORT_LISTEN, listenFunction)

    expressConfig(app);
    await databaseConfig(app);
    routerConfig(app);

    app.listen(PORT_LISTEN, listenFunction);
}

const listenFunction = () => console.log('Server is woring on port: ' + PORT_LISTEN)