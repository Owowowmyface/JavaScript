const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', jsonParser, (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
