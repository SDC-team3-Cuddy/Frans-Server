require('newrelic');
const express = require('express');
const app = express();
const db = require('./db/index.js');
const model = require('./db/models/postgresqlQuery.js');
const EC2Seed = require('./db/models/seedingEC2.js');
const path = require('path');

//const bodyParser = require('body-parser');
//var compression = require('compression')
//const cors = require('cors');
app.use(express.static('public'));

app.get('/loaderio-3a9f67577d82c3d78d79cbc86d8d6c61.txt', function(req, res){
  res.sendFile(__dirname + '/loaderio-6b76e8f462a18c7c3f9649e1e8cfe386.txt');
});

app.get('/api/item', async (req, res) => {
  model.getItemById(req.headers.id, function(err, data) {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/api/item', async (req,res) => {
  model.addToItems(req.headers, function(err, data) {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.delete('/api/item', async (req, res) => {
  model.deleteItemById(req.headers.id, function(err, data) {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

let port = 3001;
app.listen(port, function() {
  console.log('listening');
});


//OLD CODE
// app.get('/api/itemsall', async (req, res) => {
//   EC2Seed.copyToEC2(function(err, data) {
//     if(err) {
//       res.send(err);
//     } else {
//     res.send(data);
//     }
//   });
//   // model.getAllItems(function(err, data) {
//   //   if(err) {
//   //     res.send(err);
//   //   } else {
//   //     res.send(data);
//   //   }
//   // });
// });
// app.use(cors());
// app.use(bodyParser.json());
// app.use(compression());

// app.use(express.static('../public'));
// app.use(express.static(__dirname + '/../public'));

// app.get('/:item_id', (req, res) => {
//   res.sendFile(`${path.resolve(__dirname, '../', 'public')}/index.html`);
// });

// app.get('/api/items', async (req, res) => {
//   let items = await model.getAllItems()
//   items = model.formatItemData(items);
//   // console.log(items);
//   res.end(JSON.stringify(items));
// });

// app.post('/api/items', async (req, res) => {
//   var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
//   let callback = function(data) {
//   res.end(JSON.stringify(data));
//   }
//   model.insertItems(data, callback);
// });

// app.delete('/api/items', async (req, res) => {
//   var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
//   let callback = function(data) {
//   res.end(JSON.stringify(data));
//   }
//   model.deleteItems(data, callback);
// });

// app.update('/api/items', async (req, res) => {
//   var data = {itemNum: req.body.itemNum, POSNum: req.body.POSNum, avgScore: req.body.avgScore, reviewCount: req.body.reviewCount, title: req.body.title};
//   let callback = function(data) {
//   res.end(JSON.stringify(data));
//   }
//   model.updateItems(data, callback);
// });
// //endpoint to get photos by item id

// app.post('/api/photos', async (req, res) => {
//   let itemID = req.body.itemID;
//   let photos = await model.getPhotosByItemID(itemID);
//   photos = model.formatPhotoData(photos);
//   res.end(JSON.stringify(photos))
// });

// app.listen(port, () => {
//   console.log(`The Guitar Centaur rocks out to http://localhost:${port}`)
// });

// app.get('/loaderio-6b76e8f462a18c7c3f9649e1e8cfe386.txt', async (req,res) => {
//   res.sendFile(__dirname + 'loaderio-6b76e8f462a18c7c3f9649e1e8cfe386.txt');
// });