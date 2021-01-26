import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes'
import './Header.scss'

const Header = () => {
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
