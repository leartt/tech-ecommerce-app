const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/UserController');

const { auth } = require('../../utils/verifyAuth');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

module.exports = router;