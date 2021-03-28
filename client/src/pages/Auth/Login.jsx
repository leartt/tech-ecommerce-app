import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AUTH_RESET_REQUEST_STATE } from 'redux/actions/types';
import { loginUser } from 'redux/actions/authActions';

import './Auth.scss';

const Login = () => {

   const dispatch = useDispatch();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const error = useSelector(state => state.auth.request.error)

   const handleLogin = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email: email, password: password }))
   }

   useEffect(() => {
      return () => {
         dispatch({ type: AUTH_RESET_REQUEST_STATE })
      }
   }, [])

   return (
      <div className="Login">
         <Container>
            <Form onSubmit={handleLogin} className="Login__form">
               <h1 className="Login__title">Login</h1>
               {error && <Alert dismissible variant="danger">{error}</Alert>}
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email" placeholder="Enter email"
                     value={email} onChange={(e) => setEmail(e.target.value)} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password"
                     value={password} onChange={(e) => setPassword(e.target.value)} />
               </Form.Group>
               <Button variant="danger" onClick={handleLogin}>Log in</Button>
               <Form.Text>Don't have an account? <Link to="/signup">Create</Link> a new account.</Form.Text>
            </Form>
         </Container>
      </div>
   )
}

export default Login
