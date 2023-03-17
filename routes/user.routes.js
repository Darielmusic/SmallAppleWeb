const controller = require('../controller/user.controller');
const { Router } = require('express');

const router = Router();
let baseURL = '/api/user/';

router.get(`${baseURL}`,controller.getUser)
router.get(`${baseURL}:id`, controller.getById);
router.post(`${baseURL}`, controller.postUser);
router.put(`${baseURL}:id`, controller.putUser);

module.exports = router