const express = require('express');
const cors = require('cors');

const hostname = '0.0.0.0';
const port = 3002;

const server = express();


server.use(cors());

server.use(express.urlencoded());
server.use(express.json());

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const convertRoute = require('./api/routes/convertRoute.js')
convertRoute(server)

const convertQuoteRoute = require('./api/routes/convertQuoteRoute.js')
convertQuoteRoute(server)

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
