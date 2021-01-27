import React, { useEffect } from 'react'
import { Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../redux/actions/productActions';

const SingleProduct = ({ match }) => {

    const dispatch = useDispatch();

    const product = useSelector(state => state.product.product);
    const loading = useSelector(state => state.product.request.loading);

    const getProductById = () => {
        const id = match.params.id;
        dispatch(getProduct(id))
    }

    console.log(loading)

    useEffect(() => {
        getProductById()
    }, [])
    return (
        !loading ? <div className="SingleProduct">
            <Row>
                <Col xs={12} md={6}>
                    <Carousel className="SingleProduct__carousel">
                        {product?.images.map((image, index) => (
                            <Carousel.Item key={index} className="SingleProduct__carousel-item">
                                <img
                                    className="d-block w-100 SingleProduct__carousel-image"
                                    src={`http://localhost:5500/${image}`}
                                    alt={product.short_name}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col xs={12} md={6}>
                    <h2>{product?.short_name}</h2>
                    <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div> : 'Loading'
    )
}

export default SingleProduct
