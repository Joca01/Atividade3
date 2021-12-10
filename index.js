const PORT = 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.json());

const routes = require('./routes/routes')

app.use('/', routes);

app.listen(PORT);

app.use(express.static('public'));
