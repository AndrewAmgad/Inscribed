const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user_id: {},
    date: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: Array},
    color: {type: String, required: true},
    folder: {type: String},
    pinned: {type: Boolean},
    archived: {type: Boolean}
});

module.exports = mongoose.model('Note', noteSchema);
