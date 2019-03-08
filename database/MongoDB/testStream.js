const fs = require('fs');
const faker = require('faker');
const {
  randomNumberDec,
  randomNumberInt,
  randomNumberArr,
  generateSimilarList,
  generateLikeList
} = require('../helpers.js');
    
const file = fs.createWriteStream('./products.json');

let dataGeneration = (i) => {
  let similarResult = [];
  let likeResult = [];
  let product = {
    id: i,
    product_name: faker.random.word(),
    category: faker.commerce.productAdjective(),
    size: randomNumberArr(randomNumberInt(1, 5)),
    description: faker.lorem.words(Math.floor(Math.random() * 12 + 1)),
    sku: randomNumberInt(1000000, 2000000),
    stars: randomNumberDec(0, 5),
    reviews: randomNumberInt(0, 1000),
    badge: Math.random() >= 0.9,
    loves: randomNumberInt(0, 200000),
    exclusive: Math.random() >= 0.7,
    online_only: Math.random() >= 0.7,
    limited_edition: Math.random() >= 0.8,
    free_shipping: Math.random() >= 0.7,
    price: `$${randomNumberDec(1, 200)}`,
    image: `https://picsum.photos/300/300/?image=${Math.floor(
      Math.random() * 1000
    ) + 1}`,
  };

  for (let i = 0; i < 15; i++) {
    similarResult.push(Math.floor(Math.random() * 10000000));
    likeResult.push(Math.floor(Math.random() * 10000000));
  }

  product.similar = similarResult;
  product.like = likeResult;

  return product;
}
function writeOneMillionTimes(file) {
  let upperLim = 10000000;
  var i = 0;
  write();
  function write() {
    var ok = true;
    do {
      i += 1;
      if (i === upperLim) {
        // last iteration
        file.write(JSON.stringify(dataGeneration(i)), 'utf-8');
        console.log('DONE');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = file.write(JSON.stringify(dataGeneration(i)), 'utf-8');
        if (i % 100000 === 0) console.log('Writing ten million products:',`${i / 100000}%`)
      }
    } while (i < upperLim && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      file.once('drain', write);
    }

    return;
  }

}

console.time('writeOneMillionTimes')
writeOneMillionTimes(file);

console.timeEnd('writeOneMillionTimes')
