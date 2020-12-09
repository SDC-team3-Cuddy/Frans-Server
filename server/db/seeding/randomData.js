const faker = require('faker');
const fs = require('fs');
const photos = require('./images.js').photos;

var counter = 10000000;
// var writeStreamPhoto = fs.createWriteStream(__dirname + '/csv/photos.csv', {flags: 'a'});
var writeStreamItem = fs.createWriteStream(__dirname + '/csv/items.csv', {flags: 'a'});

//converts objects into a CSV format

var converttoCSVItem = function (item) {
  var response = `${item.id}, ${item.itemNum}, ${item.POSNum}, ${item.avgScore}, ${item.reviewCount}, ${item.photos}, ${item.title}\n`;
  return response;
};

//Return a random object
var populateItems = function (id) {
  var photo = photos[Math.floor(Math.random() * photos.length)];
  for(var x = 0; x<4; x++){
    photo.concat((photos[Math.floor(Math.random() * photos.length)] + '|'));
  }
  let itemObj = {
    id: id,
    itemNum: faker.random.number(),
    POSNum: faker.random.number(),
    avgScore: faker.random.number(5),
    reviewCount: faker.random.number(100),
    photos: photo,
    title: `${faker.company.catchPhraseAdjective()} ${faker.company.bsAdjective()} ${faker.commerce.productName()}`
  };
  return converttoCSVItem(itemObj);
};

//Using the write stream to create my formatted csv files
var writetoItems = function() {
  var header = 'id,itemNum,POSNum,avgScore,reviewCount,photos,title\n';
  writeStreamItem.write(header, 'utf8');
  let i = counter;
  let items;
  const write = () => {
    let canWrite = true;
    do {
      items = populateItems(i);
      i--;
      if (i === 0) {
        writeStreamItem.write(items, 'utf8', (()=>{ writeStreamItem.end(); }));
      } else {
        canWrite = writeStreamItem.write(items, 'utf8');
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      console.log(i);
      writeStreamItem.once('drain', write);
    }
  };
  write();
};

//Function to run it all
var Seed = function() {
  //test();
  writetoItems();
  // writetoPhotos();
};

module.exports = {
  Seed
};


//OLD CODE

// var converttoCSVPhoto = function (item) {
//   // var header = 'id,itemID,photoDescription,srcURL';
//   // var response = array.map(item=>
//   //   `${item.id}, ${item.itemID}, ${item.photoDescription}, ${item.srcURL}`);
//   // return header.concat(response.join('\n'));
//   var response = `${item.id}, ${item.itemID}, ${item.photoDescription}, ${item.srcURL}\n`;
//   return response;
// };

//populates arrays with random objsh(itemObj);



// var populatePhotos = function (id, item) {
//   let imageObj = {
//     id: id,
//     itemID: item,
//     photoDescription: `${faker.random.word()}`,
//     srcURL: photos[Math.floor(Math.random() * photos.length)]
//   };
//   return converttoCSVPhoto(imageObj);
// };

//Writing methods

// var test = function() {
//   var header = 'id,itemNum,POSNum,avgScore,reviewCount,title\n';
//   writeStreamItem.write(header, 'utf8');
//   let i = counter;
//   let items;
//   const write = () => {
//     let canWrite = true;
//     do {
//       items = populateItems(i);
//       i--;
//       if (i === 0) {
//         writeStreamItem.write(items, 'utf8', (()=>{ writeStreamItem.end(); }));
//       } else {
//         canWrite = writeStreamItem.write(items, 'utf8');
//       }
//     } while (i > 0 && canWrite);
//     if (i > 0 && !canWrite) {
//       console.log(i);
//       writeStreamItem.once('drain', write);
//     }
//   };
//   write();
// };



// var writetoPhotos = function() {
//   var header = 'id,itemID,photoDescription,srcURL\n';
//   writeStreamPhoto.write(header, 'utf8');
//   let i = counter;
//   let z = counter * 5;
//   let Images;
//   const write = () => {
//     let canWrite = true;
//     items = '';
//     do {
//       Images = '';
//       for (var x = 0; x < 5; x++) {
//         Images.concat(populateItems(z, i));
//         z--;
//       }
//       i--;
//       if (i === 0) {
//         writeStreamPhoto.write(Images, 'utf8', (()=>{ writeStreamPhoto.end(); }));
//       } else {
//         canWrite = writeStreamPhoto.write(Images, 'utf8');
//       }
//     } while (i > 0 && canWrite);
//     if (i > 0 && !canWrite) {
//       console.log(i);
//       writeStreamPhoto.once('drain', write);
//     }
//   };
//   write();
// };
