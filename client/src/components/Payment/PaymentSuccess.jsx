import React, { useEffect, useState } from 'react'
import Axios from 'axios.js'
import { useDispatch, useSelector } from 'react-redux'
import { MdVerifiedUser as VerifiedIcon } from 'react-icons/md'
import { Container } from 'react-bootstrap'
import { clearCart } from 'redux/actions/cartActions'

const PaymentSuccess = ({ location }) => {

   const dispatch = useDispatch()
   const items = useSelector(state => state.cart.cart)


   const getSessionData = async () => {

      try {
         // Get data for checkout
         const params = new URLSearchParams(location.search)
         const id = params.get('id');
         const checkoutResponse = await Axios.get(`/checkout-session?id=${id}`);
         const sessionData = checkoutResponse.data;
         console.log(sessionData)

         if (sessionData) {
            const order = {
               first_name: sessionData.shipping.name.split(' ')[0],
               last_name: sessionData.shipping.name.split(' ')[1],
               country: sessionData.shipping.address.country,
               city: sessionData.shipping.address.city,
               address: sessionData.shipping.address.line1,
               zipCode: sessionData.shipping.address.postal_code,
               items: items,
               total: sessionData.amount_total,
               userId: sessionData.client_reference_id,
               cs_id: sessionData.id
            }

            dispatch(clearCart())

            const res = await Axios.post('/api/orders/place', order);
            if (res.data.success) {
               console.log('Order has been placed successfully')
            }
         }

      } catch (error) {
         console.log(error)
      }

   }


   useEffect(() => {
      getSessionData()
   }, [])

   // const handlePlaceOrder = async () => {

   //    const res = await Axios.post('/api/orders/place', shippingDetails);
   //    if (res.data.success) {
   //       console.log('Order has been placed successfully');
   //    }
   // }

   return (
      <>
         <Container>
            <p style={{ maxWidth: '800px', background: '#f2f2f2', borderRadius: '10px', padding: '30px 10px', margin: '15px 0' }}><VerifiedIcon style={{ color: 'green' }} /> Thank you for your purchase. Your order has been placed.</p>
         </Container>
      </>
   )
}

export default PaymentSuccess
