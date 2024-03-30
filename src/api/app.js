const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in mongoose models
const { List, Task, Board, TaskCard } = require('./db/models');
const { Column } = require('./db/models/column.model');

// Load middleware
app.use(bodyParser.json());

// CORS HEADER MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
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
 * PATCH /lists/:id
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
        res.send({message: 'Updated Successfully.'});
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


/* KANBAN ROUTES */

/**
 * GET /boards
 * purpose: get all boards
 */
app.get('/boards', (req, res) => {
    //return an array of all the boards in the database
    Board.find({}).then((boards) => {
        res.send(boards);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * POST /boards
 * Purpose: create a board
 */
app.post('/boards', (req, res) => {
    let title = req.body.title;

    let newBoard = new Board({
        title
    });
    newBoard.save().then((boardDoc) => {
        // the full board doc is returned (including id)
        res.send(boardDoc);
    });
});

/**
 * GET /boards/:id
 * purpose: get a board with specified id
 */
app.get('/boards/:id', (req, res) => {
    //return an array of all the boards in the database
    Board.findOne({
        _id: req.params.id
    }).then((board) => {
        res.send(board);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * PATCH /boards/:id
 * purpose: update a specified board
 */
app.patch('/boards/:id', (req, res) => {
    //update the specified board (board document with id in the URL) with the new values specified in the JSON body of the request 
    Board.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/**
 * DELETE /boards/:id
 * purpose: delete a board
 */
app.delete('/boards/:id', (req,res) => {
    //delete the specified board (document with id in the URL)
    Board.findOneAndDelete({
        _id: req.params.id
    }).then((removedBoardDoc) => {
        res.send(removedBoardDoc);
    })
});

/**
 * GET /boards/:boardId/columns
 * Purpose: Get all columns in a specific board
 */
app.get('/boards/:boardId/columns', (req, res) => {
    // We want to return all columns that belong to a specific board (specified by board ID)
    Column.find({
        _boardId: req.params.boardId
    }).then((columns) => {
        res.send(columns);
    }).catch((e) => {
        res.send(e);
    })
});

/**
 * GET /boards/:boardId/columns/:columnId
 */
app.get('/boards/:boardId/columns/:columnId', (req, res) => {
    // get an existing column (specified by columnId)
    Column.findOne({
        _id: req.params.columnId,
        _boardId: req.params.boardId
    }).then((column) => {
        res.send(column);
    }).catch((e) => {
        res.send(e);
    })
});

/**
 * PATCH /boards/:boardId/columns/:columnId
 */
app.patch('/boards/:boardId/columns/:columnId', (req, res) => {
    // Update an existing column (specified by columnId)
    Column.findOneAndUpdate({
        _id: req.params.columnId,
        _boardId: req.params.boardId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Updated Successfully.'});
    })
});

/**
 * POST /boards/:boardId/columns
 * Purpose: Create a new taskcard in a specific board
 */
app.post('/boards/:boardId/columns', (req, res) => {
    //We want to create a new columns in a board specified by boardId
    let newColumn = new Column({
        title: req.body.title,
        _boardId: req.params.boardId,
        position: req.body.position,
    });
    newColumn.save().then((newColumnDoc) => {
        res.send(newColumnDoc);
    })
})

/**
 * DELETE /boards/:boardId/taskcard/:taskcardId
 * Purpose: Delete a taskcard
 */
app.delete('/boards/:boardId/columns/:columnId', (req, res) => {
    Column.findOneAndDelete({
        _id: req.params.columnId,
        _boardId: req.params.boardId
    }).then ((removedColumnDoc) => {
        res.send(removedColumnDoc);
    })
});

/**
 * GET /columns/:columnId/taskcards
 * Purpose: Get all taskcards in a specific column
 */
app.get('/columns/:columnId/taskcards', (req, res) => {
    // We want to return all columns that belong to a specific column (specified by column ID)
    TaskCard.find({
        _columnId: req.params.columnId
    }).then((taskcards) => {
        res.send(taskcards);
    })
});

/**
 * GET /columns/:columnId/taskcards/:taskcardId
 * Purpose: Get a taskcards with the specified columnId and id
 */
app.get('/columns/:columnId/taskcards/:taskcardId', (req, res) => {
    // We want to return all columns that belong to a specific column (specified by column ID)
    TaskCard.findOne({
        _id: req.params.taskcardId,
        _columnId: req.params.columnId
        
    }).then((taskcard) => {
        res.send(taskcard);
    })
});

/**
 * PATCH /columns/:columnId/taskcard/:taskcardId
 */
app.patch('/columns/:columnId/taskcards/:taskcardId', (req, res) => {
    // Update an existing taskcard (specified by taskcardId)
    TaskCard.findOneAndUpdate({
        _id: req.params.taskcardId,
        _columnId: req.params.columnId
    }, {
        $set: req.body
    }).then((taskcard) => {
        res.send(taskcard);
    })
});

/**
 * POST /columns/:columnId/taskcards
 * Purpose: Create a new taskcard in a specific column
 */
app.post('/columns/:columnId/taskcards', (req, res) => {
    //We want to create a new taskcard in a column specified by columnId
    let newTaskCard = new TaskCard({
        title: req.body.title,
        _columnId: req.params.columnId,
        position: req.body.position,
        dueDate: req.body.dueDate
    });
    newTaskCard.save().then((newTaskCardDoc) => {
        res.send(newTaskCardDoc);
    })
})

/**
 * DELETE /columns/:columnId/taskcard/:taskcardId
 * Purpose: Delete a taskcard
 */
app.delete('/columns/:columnId/taskcards/:taskcardId', (req, res) => {
    TaskCard.findOneAndDelete({
        _id: req.params.taskcardId,
        _columnId: req.params.columnId
    }).then ((removedTaskCardDoc) => {
        res.send(removedTaskCardDoc);
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})