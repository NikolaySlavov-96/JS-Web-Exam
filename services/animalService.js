const Animal = require("../Models/Animal");


async function getAllAnimals() {
    return Animal.find({}).lean();
}

async function getLastThree() {
    return Animal.find({}).lean().sort({ creatAt: 1 }).limit(3);
}

async function createAnimal(data) {
    return await Animal.create(data);
}

async function getOneAnimal(id) {
    return Animal.findById(id).lean();
}

async function updateAnimal(id, data) {
    const inputData = await Animal.findById(id);

    inputData.name = data.name;
    inputData.years = data.years;
    inputData.kind = data.kind;
    inputData.imgUrl = data.imgUrl;
    inputData.need = data.need;
    inputData.location = data.location;
    inputData.description = data.description;

    await inputData.save();
}

async function removeById(id) {
    return Animal.findByIdAndDelete(id);
}

async function donateAnimal(userId, idAnimal) {
    const anima = await Animal.findById(idAnimal);
    anima.donations.push(userId);

    return await anima.save();
}

module.exports = {
    getAllAnimals,
    getLastThree,
    createAnimal,
    getOneAnimal,
    updateAnimal,
    removeById,
    donateAnimal
}