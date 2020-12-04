var mysql = require('mysql');

const host = 'localhost';
const port = 3000;
const url  = `http://${host}:${port}`;



var db = mysql.createConnection({
  host: host,
  user: 'myuser',
  password: 'mypassword',
  database: 'centaur'
});

db.connect();
module.exports = db;
