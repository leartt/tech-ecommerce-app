import React, { useEffect } from 'react'
import { Carousel, Col, Container, ListGroup, Row, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../redux/actions/productActions';
import NumberFormat from 'react-number-format'
import { addToCart } from 'redux/actions/cartActions';
import { Button } from 'react-bootstrap';

const SingleProduct = ({ match }) => {

   const dispatch = useDispatch();

   const product = useSelector(state => state.product.product);
   const loading = useSelector(state => state.product.request.loading);

   const getProductById = () => {
      const id = match.params.id;
      dispatch(getProduct(id))
   }

   const handleAddCart = () => {
      dispatch(addToCart(product))
   }

   console.log(loading)

   useEffect(() => {
      getProductById()
   }, [])

   return (
      product ?
         <div className="SingleProduct">
            <Container>
               <Row className="SingleProduct__row">
                  <Col xs={12} md={6} className="SingleProduct__images">
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
                  <Col xs={12} md={6} className="SingleProduct__details">
                     <h2 className="SingleProduct__details-title">{product?.short_name}</h2>
                     <hr />
                     <div className="SingleProduct__details-listGroup">
                        <div className="item-wrapper">
                           <h6 className="item"><span>Product:</span> {product.long_name}</h6>
                        </div>
                        <div className="item-wrapper">
                           <h6 className="item"><span>Release Date:</span> {product.releaseDate.split('T')[0]}</h6>
                        </div>
                        <div className="item-wrapper">
                           <h6 className="item"><span>Category:</span> {product.category}</h6>
                        </div>
                        <div className="item-wrapper">
                           <h6 className="item"><span>Description:</span> {product.description}</h6>
                        </div>
                        <div className="item-wrapper">
                           <h6 className="item price"><span>Price:</span><NumberFormat value={product.price}
                              displayType={'text'} thousandSeparator={true} prefix={'$'}
                              renderText={value => <> {value}</>}
                           /></h6>
                        </div>
                        <hr />
                        <Button className="addToCart-btn" variant="warning" onClick={handleAddCart}>Add to cart</Button>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div> : 'Loading'
   )
}

export default SingleProduct
