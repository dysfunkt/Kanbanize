const { Board } = require('./board.model');
const { TaskCard } = require('./task-card.model');
const { Column } = require('./column.model');
const { User } = require('./user.model');
const { ResetToken } = require('./reset-token.model');
const { Comment } = require('./comment.model');

module.exports = {

    Board,
    Column,
    TaskCard,
    User,
    ResetToken,
    Comment
}