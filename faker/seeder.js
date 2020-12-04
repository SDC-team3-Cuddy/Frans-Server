const faker = require('faker');
const mysql = require('mysql');
const db = require('../server/db/index.js');
const photos = require('./images.js').photos;

// console.log(photos);
let randomItems = [];
let randomImages = [];

//populates arrays with random objs
for (let i = 0; i < 100; i++) {
  let itemObj = {
    itemNum: faker.random.number(),
    POSNum: faker.random.number(),
    avgScore: faker.random.number(5),
    reviewCount: faker.random.number(100),
    title: `${faker.company.catchPhraseAdjective()} ${faker.company.bsAdjective()} ${faker.commerce.productName()}`
  };
  randomItems.push(itemObj);
}

for (let i = 0; i < 500; i++) {
  let imageObj = {
    photoDescription: `${faker.company.bsAdjective()} ${faker.random.word()}`,
    srcURL: photos[Math.floor(Math.random() * photos.length)]
  };
  randomImages.push(imageObj);
}

console.log('randomItems:', randomItems.length);
console.log('randomImages:', randomImages.length);

//adds random items to items table
for (let i = 0; i < randomItems.length; i++) {
  let current = randomItems[i];
  // console.log(current)
  let itemNum = current.itemNum;
  let POSNum = current.POSNum;
  let avgScore = current.avgScore;
  let reviewCount = current.reviewCount;
  let title = current.title;

  let query = `INSERT INTO items (itemNum, POSNum, avgScore, reviewCount, title) VALUES (${db.escape(itemNum)}, ${db.escape(POSNum)}, ${db.escape(avgScore)}, ${db.escape(reviewCount)}, ${db.escape(title)})`
  // console.log(query);
  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(res);
      console.log('new entry logged in db table items');
    }
  });
}


for (let i = 0; i < randomItems.length; i++) {
  let j = 0;
  while (j < 5) {
    let current = randomImages[Math.floor(Math.random() * randomImages.length)];
    let photoDescription = current.photoDescription;
    let srcURL = current.srcURL;
    let query = `INSERT INTO photos ( itemID, photoDescription, srcURL) VALUES ( (SELECT id from items WHERE id = ${db.escape(i + 1)}), ${db.escape(photoDescription)}, ${db.escape(srcURL)})`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(res);
        console.log('new entry logged in db table images');
      }
    });
    j++;
  }
}

db.end();

