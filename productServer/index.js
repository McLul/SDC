var express = require('express');
var axios = require('axios');
//Middle ware
var cors = require('cors');


// Router
var router = require('./routes.js');


var app = express();
module.exports.app = app;

// listen on port 3000
app.set('port', 3000);

// use cors for cross origin resource sharing (just in case)
app.use(cors());
app.use(express.json());


// use routes
app.use('', router);


// start server
app.listen(app.get('port'))
