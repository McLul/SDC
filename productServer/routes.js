var controller = require('./controllers');
var router = require('express').Router();

// routing information
router.get('/products', controller.listProducts.get);
router.get('/products/:product_id', controller.productInformation.get)
router.get('/products/:product_id/styles', controller.productStyles.get);
router.get('/products/:product_id/related', controller.relatedProducts.get);

module.exports = router;
