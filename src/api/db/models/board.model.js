const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    column1: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'To Do'
    },
    column2: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'In Progress'
    },
    column3: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'Needs Review'
    },
    column4: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'Completed'
    }
})

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board }