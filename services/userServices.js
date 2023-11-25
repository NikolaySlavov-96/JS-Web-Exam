require('dotenv').config();
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const JWT_SECTER = process.env.JWT_SECTER;

async function register(email, password) {

    const chechEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (chechEmail) {
        throw new Error('Userna is taken');
    }

    const hashedPassword = await bcryp.hash(password, 10);
    const user = await User.create({
        email,
        hashedPassword,
    });

    const token = createSession(user);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hashedPassword = await bcryp.compare(password, user.hashedPassword);

    if(hashedPassword == false) {
        throw new Error('Password is not correct')
    }

    const token = createSession(user);
    return token;
}

function createSession({ _id, email, description }) {
    const payload = {
        _id,
        email,
        description
    };

    const token = jwt.sign(payload, JWT_SECTER);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECTER);
}

module.exports = {
    register,
    login,
    verifyToken
}