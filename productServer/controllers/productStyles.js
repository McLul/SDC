const models = require ('./../models');

module.exports = {
  get: function (req, res) {
    //console.log(req)
    models.productStyles(req.params['product_id'], (err, productStyles) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(productStyles);
      }
    })
  }
}