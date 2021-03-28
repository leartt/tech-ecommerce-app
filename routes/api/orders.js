const express = require('express');
const router = express.Router();

const OrderController = require('../../controllers/OrderController');

router.get('/', OrderController.getOrders);

router.get('/:id', OrderController.getOrderById);

router.get('/user/:id', OrderController.getUserOrders);

router.post('/place', OrderController.placeOrder);

router.put('/:id/change-status', OrderController.changeOrderStatus);

module.exports = router;