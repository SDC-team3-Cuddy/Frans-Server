const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/index.js');
const model = require('./db/model.js');
const bodyParser = require('body-parser');
const path = require('path');
var compression = require('compression')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

// app.use(express.static('../public'));
app.use(express.static(__dirname + '/../public'));

app.get('/:item_id', (req, res) => {
  res.sendFile(`${path.resolve(__dirname, '../', 'public')}/index.html`);
});

app.get('/api/items', async (req, res) => {
  let items = await model.getAllItems()
  items = model.formatItemData(items);
  // console.log(items);
  res.end(JSON.stringify(items));
});

app.post('/api/items', async (req, res) => {
  var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
  let callback = function(data) {
  res.end(JSON.stringify(data));
  }
  model.insertItems(data, callback);
})

app.delete('/api/items', async (req, res) => {
  var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
  let callback = function(data) {
  res.end(JSON.stringify(data));
  }
  model.deleteItems(data, callback);
})

app.update('/api/items', async (req, res) => {
  var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
  let callback = function(data) {
  res.end(JSON.stringify(data));
  }
  model.updateItems(data, callback);
})
//endpoint to get photos by item id

app.post('/api/photos', async (req, res) => {
  var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
  let callback = function(data) {
  res.end(JSON.stringify(data));
  }
  model.insertItems(data, callback);
})

app.listen(port, () => {
  console.log(`The Guitar Centaur rocks out to http://localhost:${port}`)
});
