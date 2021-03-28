
const Order = require('../models/Order');

exports.getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find();
      return res.status(200).json({ orders, success: true })
   } catch (error) {
      next(error)
   }
}

exports.getOrderById = async (req, res, next) => {
   try {
      const id = req.params.id;
      const order = await Order.findOne({ _id: id }).populate('userId');
      return res.status(200).json({ order, success: true })
   } catch (error) {
      next(error)
   }
}

exports.getUserOrders = async (req, res, next) => {
   try {
      const { id } = req.params;
      const orders = await Order.find({ userId: id }).populate('userId');
      return res.status(200).json({ orders, success: true })
   } catch (error) {
      next(error)
   }
}

exports.placeOrder = async (req, res, next) => {
   try {

      const { first_name, last_name, country, city, address, zipCode, phone_number, total, items, userId, cs_id }
         = req.body

      const existOrder = await Order.findOne({ cs_id })

      if (existOrder) {
         return res.status(200)
      }

      const order = new Order({
         first_name,
         last_name,
         country,
         city,
         address,
         phone_number,
         zipCode,
         items,
         total,
         userId,
         cs_id
      })

      await order.save();

      return res.status(200).json({ message: 'Order has been placed successfully', success: true })
   } catch (error) {
      next(error)
   }
}

exports.changeOrderStatus = async (req, res, next) => {
   try {
      const { id } = req.params
      const { status } = req.body;
      const order = await Order.findOneAndUpdate(
         { _id: id },
         {
            $set: {
               orderStatus: status
            }
         },
         { new: true }
      ).populate('userId');
      return res.status(200).json({ order, success: true })
   } catch (error) {
      next(error)
   }
}