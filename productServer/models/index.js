const db = require ('./../db');

const listProducts = (page, count) => {
  page = page || 1;
  db.query(`SELECT p.product_id, p.name, p.slogan, p.description, p.default_price::varchar(50), p.category FROM PRODUCTS as p where product_id >${count*(page-1)} and product_id<= ${count*(page-1) + count};`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.rows)
    }
  });
}

const productInformation = (productId) => {
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
      console.log(err)
    } else {
      console.log(res.rows[0])
    }
  });
} ;

const productStyles = (productId) => {
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
      console.log(err);
    } else {
      console.log(res.rows[0]);
    }
  });
} ;


const relatedProducts = (productId) => {
  db.query(`SELECT array_agg(p.related_id)
  FROM product_relations as p
  WHERE p.product_id = ${productId}`, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.rows[0]['array_agg'])
    }
  });
} ;

relatedProducts(1)

