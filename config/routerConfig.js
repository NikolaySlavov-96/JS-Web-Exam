const errorController = require("../Controllers/404Controller");
const animalController = require("../Controllers/animalController");
const authController = require("../Controllers/authController");
const homeController = require("../Controllers/homeController");
const searchController = require("../Controllers/searchController");


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/animal', animalController);
    app.use('/search', searchController);
    app.use('*', errorController)
}