import React from 'react'
import { useDispatch } from 'react-redux';
import { Card, Button, Col } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import { addToCart } from '../../redux/actions/cartActions'
import { useHistory } from 'react-router-dom';
import './Product.scss'

const ProductCard = ({ xs = 12, md = 4, lg = 3, product }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleAddCart = (e) => {
        e.stopPropagation();
        dispatch(addToCart(product))
    }

    return (
        <Col xs={xs} md={md} lg={lg} className="my-3">
            <Card className="ProductCard" onClick={() => history.push(`/products/${product._id}`)}>
                <Card.Img className="ProductCard__image" variant="top" src={`http://localhost:5500/${product.images[0]}`} />
                <Card.Body>
                    <Card.Title className="ProductCard__title">{product.short_name}</Card.Title>
                    <Card.Text className="ProductCard__description">
                        {product.description.substring(0, 50)}...
                    </Card.Text>
                    <Card.Text className="ProductCard__price">
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} />
                    </Card.Text>
                    <Button variant="warning" onClick={handleAddCart}>Add to cart</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
