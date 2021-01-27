import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'
import { cartTotalItemsSelector, cartTotalPriceSelector } from '../../redux/reducers/cartReducer'
import NumberFormat from 'react-number-format';
import './Cart.scss'
import { useHistory } from 'react-router-dom'

const Cart = () => {

    const cartItems = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();
    const history = useHistory();


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    return (
        cartItems.length > 0 ? <div className="Cart">
            <Container>
                <Row>
                    <Col xs={12} sm={8}>
                        {cartItems.map((item, index) => (
                            <div className="Cart__item" key={index}>
                                <img src={`http://localhost:5500/${item.images[0]}`} alt="" className="Cart__item-image" />
                                <div>
                                    <p className="Cart__item-name">{item.long_name}</p>
                                    <p className="Cart__item-price">
                                        <NumberFormat value={item.price}
                                            displayType={'text'} thousandSeparator={true} prefix={'$'}
                                            renderText={value => <>{value}</>}
                                        />
                                    </p>
                                    <p className="Cart__item-quantity">Quantity: {item.quantity}</p>
                                    <div>
                                        <Button variant="success" className="mx-2" onClick={() => handleAddToCart(item)}>+</Button>
                                        <Button variant="danger" onClick={() => handleRemoveFromCart(item)}>-</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                    <Col xs={12} sm={4}>
                        <div className="Cart__checkout">
                            <p>Total items: {cartTotalItemsSelector(cartItems)}</p>
                            <p>Total Price:
                            <NumberFormat value={cartTotalPriceSelector(cartItems)}
                                    displayType={'text'} thousandSeparator={true} prefix={'$'}
                                    renderText={value => <> {value}</>}
                                />
                            </p>
                            <Button variant="warning" onClick={() => history.push('/checkout')}>Checkout</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div> : <p style={{ textAlign: 'center', margin: '30px 0' }}>No items in cart</p>
    )
}

export default Cart
