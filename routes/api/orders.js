const express = require('express');
const router = express.Router();

const OrderController = require('../../controllers/OrderController');

router.get('/', OrderController.getOrders);

module.exports = router;