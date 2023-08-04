const path = require('path');
const express = require('express');
const app = express();
const task = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./database/connectdb');
const dotenv = require('dotenv');

// Load config
dotenv.config({ path: './config/config.env' });


// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// passport  middleware
app.use(passport.initialize());
app.use(passport.session());


// middleware
app.use(express.static('./public'));
app.use(express.json());



// routes
app.use('/api/v1/tasks', task);
app.use(notFound);
app.use(errorHandlerMiddleware);

// app.get('/api/v1/task');  // get all task
// app.post('/api/v1/task');  // post a task
// app.get('/api/v1/task/:id');  // get a single task
// app.patch('/api/v1/task/:id');  // update a task
// app.delete('/api/v1/task/:id');  // get a task



PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error)   
    }
}

start()
