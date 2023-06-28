const express = require('express');

const imagenes = require('./imagenes.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/imagenes', imagenes);
}

module.exports = routerApi;