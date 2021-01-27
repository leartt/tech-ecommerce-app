const uploader = require('../utils/imageUploader');

const Order = require('../models/Order');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({ orders, success: true })
    } catch (error) {
        next(error)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id });

        return res.status(200).json({ product, success: true })
    } catch (error) {
        next(error)
    }
}





