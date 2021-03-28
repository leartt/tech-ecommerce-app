import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrdersTable from './OrdersTable';

import './Orders.scss';
import { getOrders, getUserOrders } from 'redux/actions/orderActions';
import { Container } from 'react-bootstrap';

const Orders = () => {

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const orders = useSelector(state => state.order.orders);

   useEffect(() => {
      user &&
         (user.role.toUpperCase() === 'ADMIN' ? dispatch(getOrders()) : dispatch(getUserOrders(user._id)))
   }, [user])

   return (
      orders && <div className="Orders">
         <Container>
            <h1 className="Orders__title">My Orders</h1>
            <OrdersTable orders={orders} />
         </Container>
      </div>
   )
}

export default Orders
