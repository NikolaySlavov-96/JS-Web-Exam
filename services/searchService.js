const Animal = require("../Models/Animal");

async function animalsLocation(location) {
    return await Animal.find({ location }).collation({locale: 'en', strength: 2 }).lean();
}

module.exports = {
    animalsLocation,
}