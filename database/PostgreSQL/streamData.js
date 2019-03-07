const fs = require('fs');
const faker = require('faker');
const {
  randomNumberDec,
  randomNumberInt,
  randomNumberArrDB,
  getRand,
  getTrueByChance,
} = require('../helpers.js');

// Create write streams for three tables
// const products = fs.createWriteStream('products.csv');
const similarProducts = fs.createWriteStream('similarProducts.csv');
const likeProducts = fs.createWriteStream('likeProducts.csv');

// Generate data string for CSV format
const dataGeneration = (i) => {
  // Data Initialization
  let str = '';
  let id = i;
  let product_name = faker.random.words();
  let category = faker.commerce.productAdjective();
  let size = randomNumberArrDB(randomNumberInt(1,5));
  let description = faker.lorem.words(Math.floor(Math.random() * 12 + 1));
  let sku = randomNumberInt(1000000,2000000);
  let stars = randomNumberDec(0,5);
  let reviews = randomNumberInt(0,1000);
  let badge = getTrueByChance(0.9);
  let loves = randomNumberInt(0,200000);
  let exclusive = getTrueByChance(0.7);
  let online_only = getTrueByChance(0.7);
  let limited_edition = getTrueByChance(0.8);
  let free_shipping = getTrueByChance(0.7);
  let price = randomNumberDec(1,200);
  let image = Math.floor(Math.random() * 1000) + 1;

  // Create string
  str = `${id},"${product_name}",${category},${size},"${description}",${sku},${stars},${reviews},${badge},${loves},${exclusive},${online_only},${limited_edition},${free_shipping},${price},https://picsum.photos/300/300/?image=${image}\n`
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
        productsFile.write(`id,product_name,category,size,description,sku,stars,reviews,badge,loves,exclusive,online_only,limited_edition,free_shipping,price,image\n`, 'utf-8');
        productsFile.write(dataGeneration(i), 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = productsFile.write(dataGeneration(i), 'utf-8');
          if (i % 100000 === 0) console.log('Writing ten million products:',`${i / 100000}%`)
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
        similarOrLikeProducts.write(`id,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15\n`);
        similarOrLikeProducts.write(similarOrLikeProductsDataGeneration(i), 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = similarOrLikeProducts.write(similarOrLikeProductsDataGeneration(i), 'utf-8');
        if (i % 100000 === 0) console.log("Generating ten million similar products list:",`${i / 100000}%`);
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

// writeProductsTenMillionTimes(products);
writeSimilarOrLikeTenMillionTimes(similarProducts);
writeSimilarOrLikeTenMillionTimes(likeProducts);
