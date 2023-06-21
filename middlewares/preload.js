const { getOneAnimal, getOneAnimalRaw } = require("../services/animalService");


module.exports = (lean) => async (req, res, next) => {
    const id = req.params.id;

    if(lean) {
        res.locals.animal = await getOneAnimal(id);
    } else {
        res.locals.animal = await getOneAnimalRaw(id);
    }

    next();
}