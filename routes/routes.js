const { Router } = require('express');
const product = require('./product.routes');
const user = require('./user.routes');
const category = require('./category.routes')

const generalRoutes = Router();

generalRoutes.use(product);
generalRoutes.use(user);
generalRoutes.use(category);

module.exports = generalRoutes