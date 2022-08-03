const db = require ('./../db');

module.exports =  (productId, callback) => {
    db.query(`SELECT p.product_id,
    (SELECT json_agg(resultItem)
    FROM(
      SELECT s.style_id as style_id, s.name as name, s.original_price::varchar(50) as original_price, s.sale_price::varchar(50), s.default_style::bool as "default?",
        (SELECT json_agg(photoItem)
        FROM (
          SELECT p.url, p.thumbnail_url
          FROM photos as p
          WHERE p.style_id = s.style_id
        ) photoItem
        ) AS photos,
        (SELECT json_object_agg(sk.sku_id,
          (SELECT  item
          FROM (
            SELECT sk.size as size, sk.quantity as quantity
          ) AS item
                 )
        ) from skus AS sk where sk.style_id = s.style_id
        ) as skus
      FROM styles as s
      WHERE s.product_id = p.product_id
    ) resultItem
    ) AS results
  FROM products as p where p.product_id = ${productId};`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows[0]);
      }
    });
  }
