const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

// CORS HEADER MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 * GET /lists
 * purpose: get all lists
 */
app.get('/lists', (req, res) => {
    //return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * POST /lists
 * Purpose: create a list
 */
app.post('/lists', (req, res) => {
    //create new list and return new list document back to  the user ( includes  the id)
    //the list info (fields) will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list doc is returned (including id)
        res.send(listDoc);
    });
});

/**
 * PATH /lists/:id
 * purpose: update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    //update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request 
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists/:id
 * purpose: delete a list
 */
app.delete('/lists/:id', (req,res) => {
    //delete the specified list (document with id in the URL)
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

/**
 * GET /lists/:listID/tasks
 * Purpose: Get all tasks in a specific list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by list ID)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
});

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
app.post('/lists/:listId/tasks', (req, res) => {
    //We want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // Update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then ((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})