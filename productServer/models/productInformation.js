const db = require ('./../db');


module.exports =
   (productId, callback) => {
    db.query(`SELECT p.product_id, p.name, p.slogan, p.description, p.default_price::varchar(50), p.category,
    (SELECT json_agg(featureItem)
    FROM(
      SELECT f.feature as feature, f.value as value
      FROM features as f
      WHERE f.product_id = p.product_id
    ) featureItem
    ) AS features
    FROM products as p where p.product_id = ${productId};
    `, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res.rows[0])
      }
    });
  }
