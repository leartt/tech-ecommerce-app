import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routes, accountRoutes, adminRoutes } from '../../routes'
import { MdShoppingCart } from 'react-icons/md'
import { cartTotalItemsSelector } from '../../redux/reducers/cartReducer'
import './Header.scss'
import { logoutUser } from 'redux/actions/authActions'

const Header = () => {

   const dispatch = useDispatch()
   const cartItems = useSelector(state => state.cart.cart);
   const user = useSelector(state => state.auth.user);
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

   const handleLogout = () => {
      dispatch(logoutUser())
   }

   return (
      <header className="Header">
         <Navbar className="Header__navbar fixed-top" collapseOnSelect="true" expand="md" bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>
                  <NavLink exact to="/" className="Header__navbar-brand">iSHOP</NavLink>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="navbar__menu">
                     {routes.map((route, index) => (
                        <NavLink key={index} to={route.path} exact className="navbar__menu-links"
                           activeClassName="active"
                        >{route.name}</NavLink>
                     ))}
                     <NavDropdown title="Account" id="basic-nav-dropdown">
                        {accountRoutes.map((route, index) => (
                           isLoggedIn ?
                              route.requiresAuth && <NavDropdown.Item key={index} as={NavLink} to={route.path}>{route.name}</NavDropdown.Item>
                              : !isLoggedIn ?
                                 route.requiresGuest && <NavDropdown.Item key={index} as={NavLink} to={route.path}>{route.name}</NavDropdown.Item> : ''
                        ))}

                        {user?.role.toUpperCase() === 'ADMIN' && adminRoutes.map((route, index) => (
                           <NavDropdown.Item key={index} as={NavLink} to={route.path}>{route.name}</NavDropdown.Item>
                        ))}

                        {isLoggedIn && <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>}
                     </NavDropdown>

                     <NavLink to="/cart" className="navbar__menu-links" activeClassName="active">
                        <div className="cart-icon-wrapper">
                           <MdShoppingCart className="cart-icon" />
                           {cartItems.length > 0 && <p className="cart-total">{cartTotalItemsSelector(cartItems)}</p>}
                        </div>
                     </NavLink>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
