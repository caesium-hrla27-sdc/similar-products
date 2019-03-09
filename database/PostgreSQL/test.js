const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'similar_and_like'
});
// SELECT * FROM products p1 INNER JOIN products p2 ON p1.kind=p2.kind WHERE p1.id=${i} LIMIT 15
// SELECT kind FROM products WHERE id=${i}
for (let i = 444800; i < 444900; i++) {
  console.time(`QUERY SIMILAR PRODUCTS id: ${i}`)
  pool.query(`SELECT * FROM products p1 INNER JOIN products p2 ON p1.kind=p2.kind WHERE p1.id=${i} LIMIT 15;`, function(err, data) {
    if (err) {
      console.error(err);
    // } else {
    //   let similarId = Number(data.rows[0].kind);
    //   pool.query(`SELECT * FROM products p INNER JOIN kinds k ON k.id=p.kind WHERE k.id=${similarId} LIMIT 15;`, function(err, product) {
    //     if (err) {
    //       console.error(err);
        } else {
          // console.log(product)
          console.timeEnd(`QUERY SIMILAR PRODUCTS id: ${i}`);  
        }
    //   })
    // }
  })
}

module.exports = pool;
