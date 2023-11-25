require('dotenv').config();
const mongoDB = require('mongoose');

// const CONNECT_STRING = 'mongodb://localhost:27017/';
const CONNECT_STRING = process.env.DB_ADDRESS;

const DB_NAME = process.env.DB_NAME;

module.exports = async (app) => {
    try {
        await mongoDB.connect(CONNECT_STRING + DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Data Base connecter with ' + DB_NAME);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}