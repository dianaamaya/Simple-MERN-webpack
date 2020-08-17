const mongoose = require('mongoose');

// url to connect to the database
const URI = 'mongodb://localhost/mern-tasks';

// connection config
mongoose.connect(URI, {

    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false

});

// connect to database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});
