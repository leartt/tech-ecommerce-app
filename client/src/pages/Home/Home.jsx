import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import LatestProduct from '../../components/Product/LatestProduct'
import './Home.scss'

const Home = () => {
    return (
        <div className="Home">
            <div className="Home__hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/header-bg.jpg)` }}>
                <Container>
                    <div className="hero__description">
                        <h1 className="title">View, Shop, Buy</h1>
                        <h5 className="sub-title">We are best technology shop, we offer you best products.</h5>
                        <NavLink to="/shop" className="shop-btn">Shop Now</NavLink>
                    </div>
                </Container>
            </div>
            <Container>
                <LatestProduct />
            </Container>
        </div>
    )
}

export default Home
