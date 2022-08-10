var express = require('express');
var cors = require('cors');


// Router
var router = require('./routes.js');


var app = express();

// listen on port 3000
app.set('port', 3000);

// use cors for cross origin resource sharing (just in case)
app.use(express.json());
app.use(cors());


// use routes
app.use('', router);


// start server
app.listen(app.get('port'))
