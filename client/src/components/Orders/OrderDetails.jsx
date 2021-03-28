import React, { useEffect } from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { changeOrderStatus, getOrderById } from 'redux/actions/orderActions';
import NumberFormat from 'react-number-format'
import './Orders.scss'

const OrderDetails = ({ match }) => {

   const { id } = match.params;

   const dispatch = useDispatch();
   const order = useSelector(state => state.order.order);
   const user = useSelector(state => state.auth.user);

   useEffect(() => {
      dispatch(getOrderById(id))
   }, [])


   const handleChangeOrderStatus = (status) => {
      dispatch(changeOrderStatus({ id: order._id, status: status }))
   }

   const OrderStatus = ({ status, variant }) => {
      return (
         (user && user.role === "ADMIN") && <Button variant={variant}
            onClick={() => handleChangeOrderStatus(status)}
            disabled={order.orderStatus === status}>Mark as {status}</Button>
      )
   }

   return (
      order ? <div className="OrderDetails">
         <Container>
            <p className="OrderDetails__title">Order <strong>{order._id}</strong> was placed on <strong>{new Date(order.date).toLocaleDateString()}</strong> and its status is <strong>{order.orderStatus}</strong></p>

            <OrderStatus status={"ON HOLD"} variant="secondary" />
            <OrderStatus status={"SHIPPED"} variant="warning" />
            <OrderStatus status={"COMPLETED"} variant="success" />

            <Row>
               <ListGroup as={Col} xs={12} sm={6}>
                  <p style={{ marginTop: '20px' }}>Shipping Details</p>
                  <ListGroup.Item>First Name: {order.first_name}</ListGroup.Item>
                  <ListGroup.Item>Last Name: {order.last_name}</ListGroup.Item>
                  <ListGroup.Item>Country: {order.country}</ListGroup.Item>
                  <ListGroup.Item>City: {order.city}</ListGroup.Item>
                  <ListGroup.Item>Address: {order.address}</ListGroup.Item>
                  <ListGroup.Item>Zip Code: {order.zipCode}</ListGroup.Item>
               </ListGroup>


               <ListGroup as={Col} xs={12} sm={6}>
                  <p style={{ marginTop: '20px' }}>User Details</p>
                  <ListGroup.Item>User ID: {order.userId._id}</ListGroup.Item>
                  <ListGroup.Item>First Name: {order.userId.firstName}</ListGroup.Item>
                  <ListGroup.Item>Last Name: {order.userId.lastName}</ListGroup.Item>
                  <ListGroup.Item>Email: {order.userId.email}</ListGroup.Item>
                  <ListGroup.Item>Role: {order.userId.role}</ListGroup.Item>
               </ListGroup>
            </Row>

            <div className="OrderDetails__itemWrapper">
               Order Items
               {order.items.map(item => (
               <div className="order-item" key={item._id}>
                  <img src={`http://localhost:5500/${item.images[0]}`} alt="" />
                  <div>
                     <h5 className="name">{item.long_name}</h5>
                     <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className="price">Price: {value}</p>} />
                     <p className="quantity">Qty: {item.quantity}</p>
                  </div>
                  <NumberFormat value={item.quantity * item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className="item-total">Total: {value}</p>} />
               </div>
            ))}
               <hr></hr>
               <div className="orderTotal">
                  <NumberFormat value={order.total / 100} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>Total Payment: <strong>{value}</strong></p>} />
               </div>
            </div>
         </Container>
      </div> : 'Loading'
   )
}

export default OrderDetails
