const { isGuest, hasUser } = require('../middlewares/guards');
const { login } = require('../services/userServices');
const { register } = require('../services/userServices');
const { partserError } = require('../util/parser');

const authController = require('express').Router();


authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;

    try {
        if (body.username === '') {
            throw new Error('Username is request');
        }

        if (body.password === '') {
            throw new Error('Password is required');
        }
        const token = await login(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        res.render('login', {
            title: 'Login Page',
            error: partserError(err),
            body: {
                email: body.email
            }
        })
    }
});

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
})

authController.post('/register', async (req, res) => {
    const body = req.body;
    try {
        if (body.email.length < 10) {
            throw new Error('Email address is very short. Min 10 characters')
        }

        if (body.password.length < 4) {
            throw new Error('Password is very short. Min 4 characters');
        }

        if(!body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/)) {
            throw new Error('Incorrect type of password')
        }

        if (body.password !== body.rePassword) {
            throw new Error('Password don\'t match')
        }

        const token = await register(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        res.render('register', {
            title: 'Register Page',
            error: partserError(err),
            body: {
                email: body.email,
            }
        })
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;