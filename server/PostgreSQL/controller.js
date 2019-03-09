const pool = require('../../database/PostgreSQL/index.js');

const getSimilar = (req, res) => {
  let { id } = req.params;
  
  pool.query(`SELECT * FROM products p1 INNER JOIN products p2 ON p1.kind=p2.kind WHERE p1.id=${id} LIMIT 15;`, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(response.rows);
    }
  })
}

const getLike = (req, res) => {
  let { id } = req.params;
  
  pool.query(`SELECT * FROM products p1 INNER JOIN products p2 ON p1.category=p2.category WHERE p1.id=${id} LIMIT 15;`, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(response.rows);
    }
  })
}

const updateLove = (req, res) => {

}

const putProduct = (req, res) => {

}

const deleteProduct = (req, res) => {

}

module.exports = {
  getSimilar,
  getLike,
  updateLove, 
  putProduct, 
  deleteProduct
}