const express = require('express');
const app = express();
const port = 8080;
const models = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

app.get('/api/cows', (req, res) => {
  models.cows.getAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('GET', data);
      res.status(200).json(data);
    }
  });
});

app.post('/api/cows', (req, res) => {
  models.cows.create(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('POST', data);
      res.status(201).json(data);
    }
  });
});

app.delete('/api/cows/:id', (req, res) => {
  console.log('DELETE Request', req.params.id);
  models.cows.delete(req.params.id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('DELETE', data);
      res.status(200).json(data);
    }
  });
});

app.put('/api/cows/', (req, res) => {
  models.cows.update(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('UPDATE', data);
      res.status(200).json(data);
    }
  });
});

app.options('*', cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
