import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
    return (
        <Navbar collapseOnSelect="true" expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="">
                    <NavLink to="/"><h1>iSHOP</h1></NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <NavLink to="" className="text-white" >Home</NavLink>
                        <NavLink to="/shop" className="text-white">Shop</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
