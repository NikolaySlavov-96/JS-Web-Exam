const { model, Schema, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const animalSchema = new Schema({
    name: { type: String, required: true, minLength: [2, 'Name length is minimal 4 characters'] },
    kind: { type: String, required: true, minLength: [3, 'Kind length is minimal 3 characters'] },

    years: { type: Number, required: true, min: [1, 'Years is minimal 1'], max: [100, 'Max years is 100'] },
    imgUrl: {
        type: String, required: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image URL is not correct'
        }
    },

    need: { type: String, required: true, minLength: [3, 'Need length is minimal 3 characters'], maxLength: [20, 'Need length is maximal 20 characters'] },
    location: { type: String, required: true, minLength: [5, 'Location is with minimal length 5 characters'], maxLength: [15, 'Location is with maximal length 15 characters'] },
    description: { type: String, required: true, minLength: [5, 'Description length is minimal 5 characters'], maxLength: [50, 'Description length is maximal 50 characters'] },
    donations: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User' },
})

const Animal = model('Animal', animalSchema);

module.exports = Animal;

/*
The photo image is required and should start with http:// or https://
*/
