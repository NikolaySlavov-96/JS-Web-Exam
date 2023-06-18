const { getLastThree } = require('../services/animalService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const animals = await getLastThree();
    res.render('home', {
        title: 'Home Page',
        animals,
    });
})

module.exports = homeController;