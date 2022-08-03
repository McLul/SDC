const db = require ('./../db');



module.exports =  (page, count, callback) => {
    page = Math.abs(page) || 1;
    db.query(`SELECT p.product_id, p.name, p.slogan, p.description, p.default_price::varchar(50), p.category FROM PRODUCTS as p where product_id >${count*(page-1)} and product_id<= ${(count*(page-1)) + count};`, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res.rows)
      }
    });
  }

