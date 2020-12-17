const {Pool} = require('pg');
const connection = new Pool ({
  host: '172.31.33.202',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
});

module.exports = {
  getAllItems: (callback) => {
      let query = `SELECT * FROM items;`;
      connection.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      });
    },

    getItemById: (id, callback) => {
      let query = `SELECT * FROM items WHERE id =` + id +';';
      connection.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      });
    },

    addToItems: (item, callback) => {
      let query = `INSERT INTO items(itemNum,POSNum,avgScore,reviewCount,photos,title) VALUES (${item.itemNum},${item.POSNum},${item.avgScore},${item.reviewCount},${item.photos},${item.title})`;
      connection.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      });
    },

    deleteItemById: (id, callback) => {
      let query = `DELETE FROM items WHERE id =` + id +';';
      connection.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      });
    }
}
