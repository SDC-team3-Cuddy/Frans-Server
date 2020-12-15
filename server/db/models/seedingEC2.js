const {Pool} = require('pg');
const connection = new Pool ({
  host: '3.22.171.167',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'password'
});

module.exports = {
  copyToEC2: (callback) => {
    id = 1000;
      connection.query(`SELECT * FROM items WHERE id = 1000 ;`, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      });
    },
}
