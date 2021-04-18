const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
let port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/managementApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

const api = require('./ApiRoutes');
app.use('/', api);

app.listen(port, function () {
    console.log("Running blog on port " + port);
});

module.exports = app;
