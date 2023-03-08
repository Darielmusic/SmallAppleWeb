const { Router } = require('express');
const product = require('./product.routes');
const user = require('./user.routes');

const generalRoutes = Router();

generalRoutes.use(product);
generalRoutes.use(user);

module.exports = generalRoutes