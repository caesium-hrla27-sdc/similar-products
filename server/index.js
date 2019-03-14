const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const PORT = 3004;
const db = require('../database/PostgreSQL/index.js');
const { getSimilar, getLike, updateLove, postProduct, deleteProduct } = require('./PostgreSQL/controller.js');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/similar/:id', getSimilar);
app.get('/like/:id', getLike);
app.put('/love/:id', updateLove);
app.post('/basket/in/:id', postProduct);
app.delete('/basket/out/:id', deleteProduct);

app.listen(PORT, () => console.log('Listening to port ', PORT));
