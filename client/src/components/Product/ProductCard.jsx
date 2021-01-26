import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'

const ProductCard = ({ xs=12, md=4, lg=3, product }) => {
    return (
        <Col xs={xs} md={md} lg={lg}>
            <Card className="ProductCard">
                <Card.Img className="ProductCard__image" variant="top" src={`http://localhost:5500/${product.images[0]}`} />
                <Card.Body>
                    <Card.Title className="ProductCard__title">{product.short_name}</Card.Title>
                    <Card.Text className="ProductCard__description">
                        {product.description}.
                </Card.Text>
                    <Button variant="warning mr-2">View More</Button>
                    <Button variant="secondary">Add to cart</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
