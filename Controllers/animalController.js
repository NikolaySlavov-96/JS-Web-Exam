const { createAnimal, getAllAnimals, getOneAnimal, updateAnimal, removeById, donateAnimal } = require('../services/animalService');

const { hasUser } = require('../middlewares/guards');
const { partserError } = require('../util/parser');

const animalController = require('express').Router();

animalController.get('/catalog', async (req, res) => {
    const animals = await getAllAnimals();
    res.render('dashboard', {
        title: 'Dashboard Page',
        animals,
    })
});

animalController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page',
    })
});

animalController.post('/create', async (req, res) => {
    const body = req.body;
    const animal = {
        name: body.name,
        years: Number(body.years),
        kind: body.kind,
        imgUrl: body.imgUrl,
        need: body.need,
        description: body.description,
        location: body.location,
        owner: req.user._id
    }

    try {
        if (Object.values(animal).some(a => !a)) {
            throw new Error('All fields is required');
        }

        await createAnimal(animal);
        res.redirect('/animal/catalog');

    } catch (err) {
        res.render('create', {
            title: 'Create Page',
            error: partserError(err),
            body: animal
        })
    }
})

animalController.get('/detail/:id', async (req, res) => {
    const animal = await getOneAnimal(req.params.id);
    const infoData = {
        isOwner: animal.owner.toString() === req?.user?._id ? true : false,
        hasGues: req.user,
        donation: false,
    }

    if (!infoData.isOwner && infoData.hasGues) {
        infoData.donation = animal.donations.map(e => e.toString()).filter(e => e === req.user._id)
    }

    res.render('details', {
        title: 'Details Page',
        animal,
        infoData,
    })
});

animalController.get('/edit/:id', hasUser(), async (req, res) => {
    const animal = await getOneAnimal(req.params.id);
    
    res.render('edit', {
        title: 'Edit Page',
        animal,
    })
});

animalController.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const animalIn = await getOneAnimal(id);

    if (animalIn.owner.toString() !== req.user._id) {
        return res.redirect('/auth/login');
    }

    console.log(animalIn)

    const body = req.body;
    const animal = {
        name: body.name,
        years: Number(body.years),
        kind: body.kind,
        imgUrl: body.imgUrl,
        need: body.need,
        description: body.description,
        location: body.location,
    }

    try {
        if (Object.values(animal).some(e => !e)) {
            throw new Error('All fields is required');
        }

        await updateAnimal(id, animal);
        res.redirect('/animal/detail/' + id);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Page',
            animal: Object.assign(animal, { _id: animalIn._id }),
            error: partserError(err)
        })
    }
});

animalController.get('/delete/:id', hasUser(), async (req, res) => {
    const id = req.params.id;

    await removeById(id);
    res.redirect('/animal/catalog')
});

animalController.get('/donate/:id', async (req, res) => {
    const animalId = req.params.id;

    await donateAnimal(req.user._id, animalId);

    res.redirect('/animal/detail/' + animalId)
});

module.exports = animalController;