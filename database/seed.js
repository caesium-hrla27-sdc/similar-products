const { SimilarList, LikeList } = require('./MongoDB/index.js');
const mockData = require('../MOCK_DATA.js');
const {
  randomNumberDec,
  randomNumberInt,
  randomNumberArr,
  generateSimilarList,
  generateLikeList
} = require('./helpers.js');

const imgArray = [
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1217710-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1375682-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1376086-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1790039-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1835420-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1897461-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1897487-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1897495-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1899103-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1910413-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s1918697-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s2070860-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s2077477-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s407304-main-hero-300.jpg',
  'https://s3-us-west-1.amazonaws.com/ho-fec-similar/s487694-main-hero-300.jpg'
];

const dummyData = data => {
  result = [];
  data.forEach(entry => {
    result.push({
      product_name: entry.product_name,
      category: entry.category.split(' ').slice(0, 3).join(' '),
      size: randomNumberArr(randomNumberInt(1, 5)),
      description: entry.description,
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
      ) + 1}`
    });
  });
  return result;
};

const addRealImages = data => {
  const result = [];
  for (let i = 0; i < 15; i++) {
    data[i].image = imgArray[i];
    result.push(data[i]);
  }
  return result;
};
const realData = addRealImages(dummyData(mockData));

const testData = dummyData(mockData);

const saveSimilar = data => {
  data.forEach(entry => {
    entry = new SimilarList({
      id: entry.id,
      similar: entry.similar
    })
      .save()
      .catch(err => console.log(err));
  });
};

const saveLike = data => {
  data.forEach(entry => {
    entry = new LikeList({
      id: entry.id,
      like: entry.like
    })
      .save()
      .catch(err => console.log(err));
  });
};
SimilarList.find().then(result => {
  if (result.length === 0) {
    saveSimilar(generateSimilarList(realData));
  }
});

LikeList.find().then(result => {
  if (result.length === 0) {
    saveLike(generateLikeList(testData));
  }
});