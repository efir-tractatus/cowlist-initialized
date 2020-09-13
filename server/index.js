const express = require('express');
const app = express();
const port = 3000;
const models = require('./models');
const bodyParser = require('body-parser');

app.use(express.static('./client/dist'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/cows', (req, res) => {
  models.cows.getAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
});

app.post('/api/cows', (req, res) => {
    console.log('Adding cows to herd', req.body)
  models.cows.create(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.status(201).json(data);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
