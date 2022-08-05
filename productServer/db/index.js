const { Client } = require('pg');
const API_HOST = "ec2-54-198-110-7.compute-1.amazonaws.com"

const newClient = new Client({
  hostname: API_HOST,
  user: 'dev',
  port:5432,
  password : 'loler101',
  database:'postgres'
})


newClient.connect((err)=>{
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = newClient;

// newClient.query("SELECT p.product_id, p.name, p.slogan, p.description, p.default_price::varchar(50), p.category FROM PRODUCTS as p where product_id >= 0 and product_id<=5;",(err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     //console.log(res)
//     console.log( "hiiiiiii", res.rows)
//   }
// })



// newClient.query("SELECT p.product_id, p.name, p.slogan, p.description, p.default_price::varchar(50), p.category, (SELECT json_agg (featureItem) FROM (SELECT f.feature as feature, f.value as value FROM features as f WHERE f.product_id = 1) featureItem ) AS features FROM products as p where p.product_id = 1;", (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     //console.log(res)
//     console.log( "hiiiiiii", res.rows[0])
//   }
// });


// newClient.query(`SELECT array_agg(p.related_id)
// FROM product_relations as p
// WHERE p.product_id = 1`, (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     //console.log(res)
//     //console.log( "hiiiiiii", res.rows[0])
//     console.log( "hiiiiiii", res.rows)
//   }
// });
