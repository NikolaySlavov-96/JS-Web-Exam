const { animalsLocation } = require('../services/searchService');
const { partserError } = require('../util/parser');

const searchController = require('express').Router();

searchController.get('/', (req, res) => {
    res.render('search', {
        title: 'Search Page',
        hasInfo: false,
    })
});

searchController.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        if(body.search === '') {
            throw new Error('Location field is required');
        }
    
        const searchData = await animalsLocation(body.search);
        
        res.render('search', {
            title: 'Search Page',
            animals: searchData,
            hasInfo: true,
            body: {
                search: body.search
            }
        })
    } catch (err) {
        res.render('search', {
            title: 'Search Page',
            hasInfo: true,
            body: {
                search: body.search
            },
            error: partserError(err),
        })
    }
})

module.exports = searchController;