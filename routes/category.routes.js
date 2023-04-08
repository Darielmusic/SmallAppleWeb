const controller = require('../controller/category.controller');
const {Router} = require('express');

const router = Router();
let baseURL = '/api/category/';

router.get(`${baseURL}`, controller.getCategry);
router.get(`${baseURL}:id`, controller.byIdCategory);
router.post(`${baseURL}`, controller.postCategory);
router.put(`${baseURL}:id`, controller.putCategory);

module.exports = router
