const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true,
        // match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
     },
    firstName: {
        type: String,
        required: true,
        max: 10
    },
    lastName: {
        type: String,
        required: true,
        max: 10
    },
    password: { type: String, required: false, max: 100 },
    googleId: {type: String, required: false},
    activeSessions: Array,
});

module.exports = mongoose.model('User', userSchema);
