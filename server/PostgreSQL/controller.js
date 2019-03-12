const pool = require('../../database/PostgreSQL/index.js');

const getSimilar = (req, res) => {
  console.log("IN GET SIMILAR");
  let { id } = req.params;
  
  pool.query(`SELECT * FROM products p1 INNER JOIN products p2 ON p1.kind=p2.kind WHERE p1.id=${id} LIMIT 15;`, (err, response) => {
    if (err) {
      console.error(err);
      res.status(404).end();
    } else {
      res.status(200).json(response.rows);
    }
  })
}

const getLike = (req, res) => {
  console.log("IN GET LIKE");
  let { id } = req.params;
  
  pool.query(`SELECT * FROM products p1 INNER JOIN products p2 ON p1.category=p2.category WHERE p1.id=${id} LIMIT 15;`, (err, response) => {
    if (err) {
      console.error(err);
      res.status(404).end();
    } else {
      res.status(200).json(response.rows);
    }
  })
}

const updateLove = (req, res) => {
  console.log("IN UPDATE");
  let { id, love } = req.params;

  pool.query(`UPDATE products SET loves = loves + ${love} WHERE id = ${id};`, (err) => {
    if (err) {
      console.error(err);
      res.status(404).end();
    } else {
      res.status(202).end();
    }
  })
}

const postProduct = (req, res) => {
  console.log("IN POST");
  let { id, item_name, quantity } = req.params;

  pool.query(`INSERT INTO baskets (id, item_name, quantity) VALUES (${id}, ${item_name}, ${quantity});`, err => {
    if (err) {
      console.error(err);
      res.status(404).end();
    } else {
      res.status(201).end();
    }
  })
}

const deleteProduct = (req, res) => {
  console.log("IN DELETE");
  let { id } = req.params;

  pool.query(`DELETE FROM baskets WHERE product_id=${id};`, err => {
    if (err) {
      console.error(err);
      res.status(404).end();
    } else {
      res.status(202).end();
    }
  })
}

module.exports = {
  getSimilar,
  getLike,
  updateLove, 
  postProduct, 
  deleteProduct
}