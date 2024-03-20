const mongoose = require('mongoose');

const TaskCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _boardId: {
        type: mongoose.Types.ObjectId,
        required: true
    }, 
    status: {
        type: Number,
        default: 0
    },
    position: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: '',

    }

})

const TaskCard = mongoose.model('TaskCard', TaskCardSchema);

module.exports = { TaskCard }