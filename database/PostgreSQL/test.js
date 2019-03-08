const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'similar_and_like'
});



for (let i = 3999400; i < 3999500; i++) {
  let counter = 0;
  console.time(`QUERY SIMILAR PRODUCTS id: ${i}`)
  pool.query(`SELECT * FROM similars WHERE id=${i};`, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      let obj = data.rows[0];
      let response = [];
      for (let key in obj) {
        pool.query(`SELECT * FROM products WHERE id=${obj[key]};`, function(err, product) {
          counter += 1;
          if (err) {
            console.error(err);
          } else {
            response.push(product.rows[0]);
          }
          if (counter === 16) {
            console.timeEnd(`QUERY SIMILAR PRODUCTS id: ${i}`);  
          }
        })
      }
    }
  })
}

module.exports = pool;
