//methods for interacting with DB and formatting data will go here
var db = require('../db');


module.exports = {
  getAllItems: () => {
    return new Promise ((resolve, reject) => {
      let query = `SELECT * FROM items`;
      db.query(query, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });

  },
  formatItemData: (items) => {
    return items.map((item) => {
      return {
        id: item.id,
        itemNum: item.itemNum,
        POSNum: item.POSNum,
        avgScore: item.avgScore,
        reviewCount: item.reviewCount,
        title: item.title
      }
    })
  },
  getAllPhotos: () => {
    return new Promise ((resolve, reject) => {
      let query = `SELECT * FROM photos`;
      db.query(query, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });
  },

  getPhotosByItemID: (itemID) => {
    return new Promise ((resolve, reject) => {
      let query = `SELECT * FROM photos WHERE itemID = ${itemID}`;
      db.query(query, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    })
  },
  formatPhotoData: (photos) => {
    return photos.map((photo) => {
      return {
        id: photo.id,
        itemID: photo.itemID,
        srcURL: photo.srcURL
      }
    })
  }
};
