const { SimilarList, LikeList } = require('../../database/MongoDB/index.js');

const getSimilar = (req, res) => {
  console.time('QUERY SIMILAR PRODUCTS')
  let { id } = req.params;
  SimilarList
    .find({ "id": id })
    .then(data => {
      SimilarList
      .find({ id: { $in: [...data[0].similar] }})
      .then(products => {
        console.timeEnd('QUERY SIMILAR PRODUCTS');        
        res.status(200).json(products)
      })
      .catch(err => {
        console.error(err)
        res.status(404).end();
      })
    })
    .catch(err => console.log(err))
}

const getLike = (req, res) => {
  let { id } = req.params;
  LikeList
    .find({ "id": id })
    .then(data => { 
      LikeList
      .find({ id: { $in: data[0].similar }})
      .then(products => {
        console.log("LIKEPRODUCTS ||", products)
        res.status(200).json(products)
      })
      .catch(err => {
        console.error(err)
        res.status(404).end();
      })
    })
    .catch(err => console.log(err))
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