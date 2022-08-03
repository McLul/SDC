const models = require ('./../models');


module.exports = {
  get: function (req, res) {
    //console.log(req)
    models.productInformation(req.params['product_id'],(err, product) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(product);
      }
    })
  }
}
