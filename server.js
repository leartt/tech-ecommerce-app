const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const stripe = require('stripe')('sk_test_51ILGwuJ42Ernh1SKdM13adXszggFpiTpZhziui924YTgCGBi2AndMAopXYX7wYZ7Rgz3NMgWj8hhSdczUxKxlFYI002x4Nw0xk')

// app initialization
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// DB Connection
require('./database/mongoDB');


app.get('/checkout-session', async (req, res, next) => {
   try {
      const session = await stripe.checkout.sessions.retrieve(req.query.id, {
         expand: ['line_items']
      })
      res.status(200).json(session)
   } catch (error) {
      next(error)
   }
})

app.post('/create-checkout-session', async (req, res) => {
   const { items, userId } = req.body;

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      line_items: items.map(item => {
         return {
            price_data: {
               currency: 'usd',
               product_data: {
                  name: item.short_name,
               },
               unit_amount: item.price * 100
            },
            quantity: item.quantity
         }
      }),
      mode: 'payment',
      client_reference_id: userId,
      success_url: 'http://localhost:3000/payment/success?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout',
      shipping_address_collection: {
         allowed_countries: ['US', 'CA', 'AL', 'XK'],
      }
   });

   res.json({ id: session.id });
});

// API endpoints
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/orders', require('./routes/api/orders'));


// Error handler middleware
app.use((err, req, res, next) => {
   if (!err.statusCode) {
      err.statusCode = 500;
   }
   return res.status(err.statusCode).json({ message: err.message, stack: err.stack })
})

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
