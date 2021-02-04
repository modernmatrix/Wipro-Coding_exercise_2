const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const expressValidator = require('express-validator');

// mongodb connection
const db = process.env.DATABASE || 'mongodb://127.0.0.1:27017/pets';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () => console.log('Database connected') )

// import routes
const petsRoute = require('./routes/pets');

// app
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cors());

// route middleware
app.use('/pets', petsRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port: ${ port }`)
})

module.exports = app; // for testing