const mongoose = require('mongoose');

const TaskCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _columnId: {
        type: mongoose.Types.ObjectId,
        required: true
    }, 
    position: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,

    },
    priority: {
        type: Boolean,
        default: false
    }

})

const TaskCard = mongoose.model('TaskCard', TaskCardSchema);

module.exports = { TaskCard }