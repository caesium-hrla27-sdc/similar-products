const fs = require('fs');
const faker = require('faker');
const {
  randomNumberDec,
  randomNumberInt,
  randomNumberArr,
  getTrueByChance,
} = require('../helpers.js');

// Create write streams for three tables
const products = fs.createWriteStream('products.csv');
const similarProducts = fs.createWriteStream('similarProducts.csv');
const likeProducts = fs.createWriteStream('likeProducts.csv');

// Generate data string for CSV format
const dataGeneration = (i) => {
  // Data Initialization
  let str = '', 
    id = i, 
    product_name = faker.random.words(),
    category = faker.commerce.productAdjective(),
    size = randomNumberArr(randomNumberInt(1,5)),
    description = faker.lorem.words(Math.floor(Math.random() * 12 + 1)),
    sku = randomNumberInt(1000000,2000000),
    stars = randomNumberDec(0,5),
    reviews = randomNumberInt(0,1000),
    badge = getTrueByChance(0.9),
    loves = randomNumberInt(0,200000),
    exclusive = getTrueByChance(0.7),
    online_only = getTrueByChance(0.7),
    limited_edition = getTrueByChance(0.8),
    free_shipping = getTrueByChance(0.7),
    price = randomNumberDec(1,200),
    image = Math.floor(Math.random() * 1000) + 1;

  // Create string
  str = `
    ${id},
    ${product_name},
    ${category},
    ${size},
    ${description},
    ${sku},
    ${stars},
    ${reviews},
    ${badge},
    ${loves},
    ${exclusive},
    ${online_only},
    ${limited_edition},
    ${free_shipping},
    $${price},
    https://picsum.photos/300/300/?image=${image}\n
  `
  return str;
}

// Create similar or like products list
const similarOrLikeProductsDataGeneration = (i) => {
  let similarStr = `${i},`;
  for (let j = 0; j < 15; j++) {
    (
      j === 14 
      ? similarStr += getRand() + '\n'
      : similarStr += getRand() + ','
    )
  }
  return similarStr;
}

// Generate ten million records
const writeProductsTenMillionTimes = (productsFile) => {
  let upperLim = 10000000;
  var i = 0;
  write();
  function write() {
    var ok = true;
    do {
      i += 1;
      if (i === upperLim) {
        // last iteration
        productsFile.write(dataGeneration(i), 'utf-8');
        console.log('DONE');
      } else if (i === 1) {
        productsFile.write(`
        #id, product_name, category, size, description, 
        sku, stars, reviews, badge, loves, exclusive, 
        online_only, limited_edition, free_shipping, price, image\n
        `, 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = productsFile.write(dataGeneration(i), 'utf-8');
          if (i % 100000 === 0) console.log('Writing ten million products:',i)
      }
    } while (i < upperLim && ok);
      if (i > 0) {
        // had to stop early!
        // write some more once it drains
        productsFile.once('drain', write);
    }
    return;
  }
}

const writeSimilarOrLikeTenMillionTimes = (similarOrLikeProducts) => {
  let upperLim = 10000000;
  var i = 0;
  write();
  function write() {
    var ok = true;
    do {
      i += 1;
      if (i === upperLim) {
        // last iteration
        similarOrLikeProducts.write(similarOrLikeProductsDataGeneration(i), 'utf-8');
        console.log('DONE');
      } else if (i === 1) {
        similarOrLikeProducts.write(`#id,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15\n`)
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = similarOrLikeProducts.write(similarOrLikeProductsDataGeneration(i), 'utf-8');
        if (i % 100000 === 0) console.log("Generating ten million similar products list:",i);
      }
    } while (i < upperLim && ok);
      if (i > 0) {
        // had to stop early!
        // write some more once it drains
        similarOrLikeProducts.once('drain', write);
    }
    return;
  }
}

writeProductsTenMillionTimes(products);
writeSimilarOrLikeTenMillionTimes(similarProducts);
writeSimilarOrLikeTenMillionTimes(likeProducts);
