const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['PROCESSING', 'COMPLETED', 'FAILED'],
        uppercase: true,
    },
    orderStatus: {
        type: String,
        enum: ['ON HOLD', 'SHIPPED', 'COMPLETED'],
        uppercase: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;