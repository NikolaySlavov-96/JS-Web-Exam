const express = require('express');
const PORT_LISTEN = 3000;
const databaseConfig = require('./config/databaseConfig');
const expressConfig = require('./config/expressConfig');
const routerConfig = require('./config/routerConfig');


start()

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routerConfig(app);

    app.listen(PORT_LISTEN, () => console.log('Server is woring on port: ' + PORT_LISTEN));
}