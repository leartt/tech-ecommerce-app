import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { loadStripe } from '@stripe/stripe-js';
import './Checkout.scss';
import Axios from 'axios.js';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from 'pages/Cart/CartSummary';
import { setShippingDetails } from 'redux/actions/authActions';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51ILGwuJ42Ernh1SKp9zzFk9x6tjrAsAfoXwhVkE9VY1sJSDKVc9PEdojBczX6azOfy5MuA3tvLfpEiv5Fh45G4cK0033F3IMCq');

const Checkout = () => {

   const items = useSelector(state => state.cart.cart)
   const user = useSelector(state => state.auth.user)

   const handleCheckoutStripe = async (e) => {

      try {
         const stripe = await stripePromise;

         // Call your backend to create the Checkout Session
         const response = await Axios.post('http://localhost:5500/create-checkout-session', { items, userId: user._id });

         const sessionId = response.data.id

         // When the customer clicks on the button, redirect them to Checkout.
         const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
         });

         console.log(result);

         if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result.error.message)
         }
      } catch (error) {
         console.log(error)
      }

   }

   return (
      <div className="Checkout">
         <Container>
            <CartSummary items={items} />
            <Button
               className="proccess-payment-btn" variant="warning"
               onClick={handleCheckoutStripe}
            >Pay with Credit Card</Button>
         </Container>
      </div>
   )
}

export default Checkout
