const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _taskcardId: {
        type: mongoose.Types.ObjectId,
        required: true
    }, 
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }