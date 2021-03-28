import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from 'redux/actions/productActions';
import ProductsTable from './ProductsTable'

const Product = () => {

   const dispatch = useDispatch()
   const products = useSelector(state => state.product.products);

   useEffect(() => {
      dispatch(getProducts({}))
   }, [])

   return (
      <div className="Products">
         <Container>
            <Button variant="success" className="Products__createBtn" as={Link} to='/product/create'>Create new product</Button>
            <ProductsTable products={products} />
         </Container>
      </div>
   )
}

export default Product
