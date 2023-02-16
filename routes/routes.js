const { Router } = require('express');
const product = require('./product.routes');

const generalRoutes = Router();

generalRoutes.use(product);

module.exports = generalRoutes