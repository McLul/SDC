const models = require ('./../models');


module.exports = {
  get: function (req, res) {
    console.log(req);
    console.log("hmmm")
    models.listProducts(parseInt(req.query['page']), parseInt(req.query['count']),(err, products) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(products);
      }
    })
  }
}

