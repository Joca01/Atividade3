const PORT = 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const routes = require('./routes/routes')

app.use('/', routes);


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(express.static('public'));