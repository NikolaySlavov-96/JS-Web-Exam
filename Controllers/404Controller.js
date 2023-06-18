const errorController = require('express').Router();

errorController.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page'
    })
})

module.exports = errorController;