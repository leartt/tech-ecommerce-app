import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AUTH_RESET_REQUEST_STATE } from 'redux/actions/types';
import { signUpUser } from 'redux/actions/authActions';

import './Auth.scss';

const Signup = () => {

   const dispatch = useDispatch();

   const error = useSelector(state => state.auth.request.error)
   const success = useSelector(state => state.auth.request.success)

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [image, setImage] = useState(null);

   const handleSignUp = (e) => {
      e.preventDefault();
      const userFormData = new FormData()
      userFormData.set('firstName', firstName)
      userFormData.set('lastName', lastName)
      userFormData.set('email', email)
      userFormData.set('password', password)
      userFormData.set('confirmPassword', confirmPassword)
      userFormData.append('image', image, image.name)
      dispatch(signUpUser(userFormData))
      if (success) {
         setFirstName('')
         setLastName('')
         setEmail('')
         setPassword('')
         setConfirmPassword('')
         setImage(null)
      }
   }

   useEffect(() => {
      return () => {
         dispatch({ type: AUTH_RESET_REQUEST_STATE })
      }
   }, [])


   return (
      <div className="Signup">
         <Container>
            <Form onSubmit={handleSignUp} className="Signup__form">
               <h1 className="Signup__title">Register</h1>
               {error && <Alert variant="danger" dismissible>{error}</Alert>}
               {success && <Alert variant="success" dismissible>{success}</Alert>}
               <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                     type="text" placeholder="Enter email"
                     value={firstName} onChange={(e) => setFirstName(e.target.value)} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                     type="text" placeholder="Enter email"
                     value={lastName} onChange={(e) => setLastName(e.target.value)} />
               </Form.Group>
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
               <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password"
                     value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Choose a profile image</Form.Label>
                  <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
               </Form.Group>
               <Button type="submit" variant="danger">Sign up</Button>
               <Form.Text>Already have an account? <Link to="/login">Log in</Link> to continue</Form.Text>
            </Form>
         </Container>
      </div>
   )
}

export default Signup
