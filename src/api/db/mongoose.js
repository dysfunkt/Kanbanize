//this file will handle connection logic to MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Kanbanize', {}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.log("error while attempting to connect to MongoDB");
    console.log(e);
});

module.exports = {
    mongoose
};