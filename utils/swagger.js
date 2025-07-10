"use strict";
const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../config/appconfig');

const directoryPath = path.join(__dirname, '../router/api');
const pathes = [];

const filesName = fs.readdirSync(directoryPath);
filesName.forEach(file => {
  if (file !== 'index.js') {
    pathes.push(`./router/api/${file}`);
  }
});

const options = {
  swaggerDefinition: {
    info: {
      title: 'modelVault',
      version: '1.0.0',
      description: 'modelVault with Swagger doc',
      contact: {
        email: 'podonolanasumanth@gmail.com',
      },
    },
    schemes: ['http'],
    host: `localhost:${config.app.port}`,
    basePath: '/api',
    securityDefinitions: {
      AccessToken: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'x-access-token',
        in: 'header',
      },
    },
    security: [
      { AccessToken: [] }
    ],
  },
  apis: pathes,
};
const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {
  router,
};
