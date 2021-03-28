import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoBagAdd } from 'react-icons/io5'
import { Card, Button, Col } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import { addToCart } from '../../redux/actions/cartActions'
import { Link, useHistory } from 'react-router-dom';
import './Product.scss'

const ProductCard = ({ xs = 12, sm = 6, md = 4, lg = 3, product }) => {

   const history = useHistory();
   const dispatch = useDispatch();

   const cartItems = useSelector(state => state.cart.cart)

   const handleAddCart = (e) => {
      e.stopPropagation();
      dispatch(addToCart(product))
      // history.push('/cart')
   }

   return (
      <Col xs={xs} sm={sm} md={md} lg={lg} className="my-3">
         <Card className="ProductCard" /*onClick={() => history.push(`/products/${product._id}`)}*/ >
            <Card.Img className="ProductCard__image" variant="top" src={`http://localhost:5500/${product.images[0]}`} />
            <Card.Body>
               <Card.Title className="ProductCard__title">{product.short_name}</Card.Title>
               <Card.Text className="ProductCard__description">
                  {product.description.substring(0, 50)}...
                    </Card.Text>
               <Card.Text className="ProductCard__price">
                  <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} />
               </Card.Text>
               <div className="ProductCard__bottomButtons">
                  <Button className="view-btn" as={Link} to={`/products/${product._id}`} variant="warning">View</Button>
                  <Button
                     disabled={cartItems.find(item => item._id === product._id)}
                     className="add-to-cart-btn" variant="warning" onClick={handleAddCart}><IoBagAdd /></Button>
               </div>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default ProductCard
