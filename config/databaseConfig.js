require('dotenv').config();
const mongoDB = require('mongoose');


module.exports = async (app) => {
    try {
        await mongoDB.connect(process.env.DB_ADDRESS, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
        })
        console.log('Data Base connecter with ');

    } catch (err) {
        console.error(err);
        // process.exit(1);
    }
}