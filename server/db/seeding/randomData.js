const faker = require('faker');
const fs = require('fs');
const photos = require('./images.js').photos;

var counter = 1000000;
var randomItems = [];
var randomImages = [];
var writeStreamPhoto = fs.createWriteStream(__dirname + '/csv/photos.csv', {flags: 'a'});
var writeStreamItem = fs.createWriteStream(__dirname + '/csv/items.csv', {flags: 'a'});
//populates arrays with random objsh(itemObj);

var populateItems = function () {
  for (let i = 0; i < counter; i++) {
    let itemObj = {
      id: i + 1,
      itemNum: faker.random.number(),
      POSNum: faker.random.number(),
      avgScore: faker.random.number(5),
      reviewCount: faker.random.number(100),
      title: `${faker.company.catchPhraseAdjective()} ${faker.company.bsAdjective()} ${faker.commerce.productName()}`
    };
    randomItems.push(itemObj);
  }
};

var populatePhotos = function () {
  for (let i = 0; i < counter / 2; i++) {
    let imageObj = {
      id: i + 1,
      itemID: Math.floor(Math.random() * counter),
      photoDescription: `${faker.company.bsAdjective()} ${faker.random.word()}`,
      srcURL: photos[Math.floor(Math.random() * photos.length)]
    };
    randomImages.push(imageObj);
  }
};

//converts arrays with objects into a CSV format

var converttoCSVItem = function (array) {
  var header = 'id,itemNum,POSNum,avgScore,reviewCount,title';
  var response = array.map(item =>
    `${item.id}, ${item.itemNum}, ${item.POSNum}, ${item.avgScore}, ${item.reviewCount}, ${item.title}`);
  return header.concat(response.join('\n'));
};

var converttoCSVPhoto = function (array) {
  var header = 'id,itemID,photoDescription,srcURL';
  var response = array.map(item=>
    `${item.id}, ${item.itemID}, ${item.photoDescription}, ${item.srcURL}`);
  return header.concat(response.join('\n'));
};

//Writing methods

var test = function(items) {
  let i = counter;
  const write = () => {
    let canWrite = true;
    do {
      i--;
      if (i === 0) {
        writeStreamItem.write(items, 'utf8', (()=>{ writeStreamItem.end(); }));
      } else {
        canWrite = writeStreamItem.write(items, 'utf8');
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      if (i % 10000 === 0) {
        writeStream.once('drain', write);
      }
    }
  };
  write();
};
var writetoItems = function(items) {
  var i = 10000000;
  writeStreamItem();
  writeStream.write(items);
};

var writetoPhotos = function(photos) {
  writeStreamPhoto();
  var ok = true;
  if (ok) {
    ok = writeStream.write(photos);
  } else {
    if (!ok) {
      writer.once('drain', write);
    }
  }
};

//Function to run it all

var Seed = function() {
  populateItems();
  populatePhotos();
  test(converttoCSVItem(randomItems));
  // writetoItems(converttoCSVItem(randomItems));
  // writetoPhotos(converttoCSVPhoto(randomImages));
};

module.exports = {
  Seed
};