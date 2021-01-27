import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes'
import { MdShoppingCart } from 'react-icons/md'
import { cartTotalItemsSelector } from '../../redux/reducers/cartReducer'
import './Header.scss'

const Header = () => {

    const cartItems = useSelector(state => state.cart.cart);

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
