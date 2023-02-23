const controller = require('../controller/products.controller');
const { Router } = require('express');

const router = Router();
let baseURL = '/api/product/';

router.get(`${baseURL}`,controller.getProduct)
router.get(`${baseURL}:id`, controller.getById);
router.post(`${baseURL}`, controller.postProduct);

module.exports = router