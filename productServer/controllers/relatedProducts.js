const models = require ('./../models');

module.exports = {
  get: function (req, res) {
    //console.log(req)
    models.relatedProducts(req.params['product_id'], (err, relatedProducts) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(relatedProducts);
      }
    })
  }
}