var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: "This is a secret.",
    resave: true,
    saveUninitialized: true
}));
var connectionString = 'mongodb://127.0.0.1:27017/';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

require('./public/assignment/server/app.js')(app, db, mongoose);
require('./public/project/server/app.js')(app);
require('./public/experiment/server/app.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);