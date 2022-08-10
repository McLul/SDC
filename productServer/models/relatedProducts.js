  const db = require ('./../db');

module.exports = (productId, callback) => {
    db.query(`SELECT array_agg(p.related_id)
    FROM product_relations as p
    WHERE p.product_id = ${productId}`, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res.rows[0]['array_agg'])
      }
    });
  }
