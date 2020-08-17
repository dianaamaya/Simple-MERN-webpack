const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');

//server
const app = express(); 

//settings
// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

//middlewares 
//functions are executed before reaching the route
app.use(morgan('dev'));
app.use(express.json());

//routes
const router = require('./routes/tasks.routes');
app.use(router);

//static files, we call the html that contains the react code
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath))

//starting the server
app.listen( port , () => {
    console.log(`server on port ${port}`);
});