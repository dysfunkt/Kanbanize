const mongoose = require('mongoose');

const ResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true

    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema);

module.exports = { ResetToken }