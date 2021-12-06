// require('dotenv').config();

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
//const bodyParser = require('body-parser');
const app = express();


const PORT = process.env.PORT || 3000;

//middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger("dev"));

//connecting to mongo and making sure its working
mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost/workout");
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


//route connections
app.use('/api/workouts', require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

//server listening
app.listen(PORT);
console.log(`Server is listening at http://localhost:${PORT}`);