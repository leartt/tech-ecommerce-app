import React, { useEffect } from 'react'
import { Col, Container, Row, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './MyProfile.scss'

import UserImage from 'assets/images/user.png'
import { getUserOrders } from 'redux/actions/orderActions';

const MyProfile = () => {

   const dispatch = useDispatch()

   const user = useSelector(state => state.auth.user);
   const orders = useSelector(state => state.order.orders);

   useEffect(() => {
      console.log('MY PROFILE RENDERED')
      user && dispatch(getUserOrders(user._id))
   }, [user])

   return (
      user && <div className="MyProfile">
         <Container>
            <h1 className="MyProfile__title">My Profile</h1>
            <Row className="MyProfile__row">
               <Col xs={12} md={4} className="MyProfile__firstCol">
                  <img className="user-image" src={`http://localhost:5500/${user.image}`} alt="" />
                  <h6 className="user-role">Role: {user.role}</h6>
                  <h6 className="user-totalOrders">Total orders: {orders?.length || 0}</h6>
               </Col>

               <Col xs={12} md={8} className="MyProfile__secondCol">
                  <FormGroup as={Row}>
                     <FormLabel column sm="3">ID:</FormLabel>
                     <Col sm="9">
                        <FormControl disabled value={user._id} />
                     </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                     <FormLabel column sm="3">First Name</FormLabel>
                     <Col sm="9">
                        <FormControl disabled value={user.firstName} />
                     </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                     <FormLabel column sm="3">Last Name</FormLabel>
                     <Col sm="9">
                        <FormControl disabled value={user.lastName} />
                     </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                     <FormLabel column sm="3">Role</FormLabel>
                     <Col sm="9">
                        <FormControl disabled value={user.role} />
                     </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                     <FormLabel column sm="3">Created at:</FormLabel>
                     <Col sm="9">
                        <FormControl disabled value={user.createdAt} />
                     </Col>
                  </FormGroup>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default MyProfile
