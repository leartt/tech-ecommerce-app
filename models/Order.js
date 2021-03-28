const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
   first_name: {
      type: String,
   },
   last_name: {
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
   zipCode: {
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
      default: 'ON HOLD',
      uppercase: true,
   },
   items: {
      type: Array,
   },
   total: {
      type: Number,
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   cs_id: {
      type: String,
   }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;