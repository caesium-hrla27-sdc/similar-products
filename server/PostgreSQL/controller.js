const { pool } = require('../../database/PostgreSQL/index.js');

const getSimilar = (req, res) => {
  console.time('QUERY SIMILAR PRODUCTS')
  let { id } = req.params;
  
  pool.query(`SELECT kind FROM products WHERE id=${id};`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let similarId = data.rows[0].category;
      pool.query(`SELECT * FROM products p INNER JOIN kinds k ON k.id=p.kind WHERE k.id=${similarId} LIMIT 15;`, (err, product) => {
        if (err) {
          console.error(err);
        } else {
          console.timeEnd('QUERY SIMILAR PRODUCTS');        
          res.status(200).json(response);
        }
      })
    }
  })
}

const getLike = (req, res) => {
  console.time('QUERY LIKE PRODUCTS')
  let { id } = req.params;
  
  pool.query(`SELECT * FROM likes WHERE id=${id};`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let obj = data.rows[0];
      let response = [];
      for (let key in obj) {
        await pool.query(`SELECT * FROM products WHERE id=${obj[key]};`, (err, product) => {
          if (err) {
            console.error(err);
          } else {
            response.push(product.rows[0])
          }
        })
      }
      console.timeEnd('QUERY LIKE PRODUCTS');        
      res.status(200).json(response);
    }
  })
}

// const getSimilar = (req, res) => {
//   SimilarList
//     .aggregate([{ $sample: { size:15 } }])
//     .then(data => res.status(200).json(data))
//     .catch(err => console.log(err))
// }

module.exports = {
  getSimilar,
  getLike
}