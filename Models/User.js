const { model, Schema } = require('mongoose');

const patterEmail = /[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+/;

const userSchem = new Schema({
    email: {
        type: String, require: true, validate: {
            validator: (value) => patterEmail.test(value),
            message: (props) => {
                return `${props.value} is not a valid email Addres`
            }
        }
    },
    hashedPassword: { type: String, require: true },
})

const User = model('User', userSchem);

module.exports = User;