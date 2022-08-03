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

const getAllProducts =  () => {
  let endPoint = `http://localhost:3000/products?page=2&count=1`;
  let newAxios = axios.create();
  newAxios
    .get(endPoint)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.error("error in getting all questions", err);
    });
}

setTimeout(()=>getAllProducts(),500)