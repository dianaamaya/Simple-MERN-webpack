/**
 * define operations on the server
 * create routes
 */

const express = require('express');
const router = express.Router();

// models
const Task = require('../models/task');

// get all tasks
router.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// get an specific task
router.get('/api/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

// create a task
router.post('/api/tasks/', async (req, res) => {
    // get parameters 
    const { title, description } = req.body;   

    // create object of the model
    const task = new Task({ title, description });

    //save data in database
    await task.save();   

    //response 
    res.json({status:'task saved'});
});

// edit task
router.put('/api/tasks/:id', async (req, res) => {
    // get parameters
    const { title, description } = req.body;
    // prepare data
    const newTask = { title, description };
    // find task to be edited and set the new data
    await Task.findByIdAndUpdate(req.params.id, newTask);
    //answer
    res.json({status:'task updated'});
});

// delete task
router.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status:'task deleted'});
});

module.exports = router;