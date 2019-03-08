const randomNumberDec = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

const randomNumberInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumberArrDB = (len) => {
  let arr = Array.from({length: len}, () => Number((Math.random() * 100).toFixed(2)));
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += " " + arr[i];
  }

  return str.substring(1);
}

const randomNumberArr = (len) => {
  return Array.from({length: len}, () => Number((Math.random() * 100).toFixed(2)));
}

// return boolean according to chance
const getTrueByChance = (chance) => {
  return Math.random >= chance;
}

// generate random id from ten million ids
const getRand = () => {
  return Math.floor(Math.random() * 10000000) + 1;
}

const generateSimilarList = (data) => {
  const result = [];
  for (let i = 1; i <= 100; i++) {
    let newObj = { id: i, similar: [] };

    for (let i = 0; i < 15; i++) {
      newObj.similar.push(data[i]);
    }
    result.push(newObj);
  }
  return result;
}

const generateLikeList = (data) => {
  const result = [];
  for (let i = 1; i <= 100; i++) {
    let newObj = { id: i, like: [] };

    for (let i = 0; i < 15; i++) {
      let getData = data[randomNumberInt(0, 1500)];
      newObj.like.push(getData);
    }
    result.push(newObj);
  }
  return result;
}

module.exports = {
  randomNumberDec,
  randomNumberInt,
  randomNumberArr,
  randomNumberArrDB,
  generateSimilarList,
  generateLikeList,
  getRand,
  getTrueByChance
};