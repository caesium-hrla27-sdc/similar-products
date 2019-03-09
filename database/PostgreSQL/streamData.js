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
const products = fs.createWriteStream('products.csv');
const similarProducts = fs.createWriteStream('similarProducts.csv');
const likeProducts = fs.createWriteStream('likeProducts.csv');

// Generate data string for CSV format
const dataGeneration = (i) => {
  // Data Initialization
  let id = i;
  let product_name = faker.commerce.productName();
  let category = randomNumberInt(1,25);
  let kind = randomNumberInt(1,100);
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
  return `${id},"${product_name}",${category},${kind},${size},"${description}",${sku},${stars},${reviews},${badge},${loves},${exclusive},${online_only},${limited_edition},${free_shipping},${price},https://picsum.photos/300/300/?image=${image}\n`
}

let category = ['face','cheek','eye','lip','brushes&applicators','accessories','nail','cleanMakeup','makeupPalettes','miniSize','value&GiftSets','justArrived','bestSellers','moisturizers','cleansers','treatments','highTech','innerBeauty','masks','eyeCare','sunCare','selfTanners','lipTreatments','shampoo','conditioner'];

const similarProductsDataGen = (i) => {
  return `${i},"${faker.random.word()}"\n`;
}

const likeProductsDataGen = (i) => {
  return `${i},${category[i]}\n`;
}

const writeProductsTenMillionTimes = (productsStream, type, cb, lim) => {
  let upperLim = lim;
  var i = 0;
  write();
  function write() {
    var ok = true;
    do {
      i += 1;
      if (i === upperLim) {
        // last iteration
        productsStream.write(cb(i), 'utf-8');
        console.log('DONE');
      } else if (i === 1) {
        productsStream.write(`id,${type}\n`);
        productsStream.write(cb(i), 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = productsStream.write(cb(i), 'utf-8');
        if (i % 100000 === 0) console.log("Generating ten million similar products list:",`${i / 100000}%`);
      }
    } while (i < upperLim && ok);
      if (i > 0) {
        // had to stop early!
        // write some more once it drains
        productsStream.once('drain', write);
    }
    return;
  }
}

writeProductsTenMillionTimes(products,'product_name,category,size,description,sku,stars,reviews,badge,loves,exclusive,online_only,limited_edition,free_shipping,price,image',dataGeneration,10000000);
writeProductsTenMillionTimes(similarProducts,'kind',similarProductsDataGen,100);
writeProductsTenMillionTimes(likeProducts,'category',likeProductsDataGen,25);
