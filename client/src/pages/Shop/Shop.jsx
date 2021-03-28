import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from 'components/Product/ProductCard';
import Filter from 'components/SearchSortFilter/Filter/Filter';
import Search from 'components/SearchSortFilter/Search/Search';
import Sort from 'components/SearchSortFilter/Sort/Sort';
import { getProducts } from 'redux/actions/productActions';
import './Shop.scss'

const Shop = () => {

   const dispatch = useDispatch();

   // store state
   const products = useSelector(state => state.product.products);

   // component state
   const [productActions, setProductActions] = useState({
      searchQuery: '',
      filter: '',
      sort: '',
   });

   useEffect(() => {
      dispatch(getProducts({
         productName: productActions.searchQuery,
         productSort: productActions.sort,
      }))
   }, [productActions])

   const handleSearch = (query) => {
      setProductActions({ ...productActions, searchQuery: query })
   }

   const handleSort = (sort) => {
      setProductActions({ ...productActions, sort: sort })
   }

   console.log('Shop')

   return (
      <div className="Shop">
         <Container>
            <div className="Shop__filters">
               <Filter />
               <Search handleSearch={handleSearch} />
               <Sort handleSort={handleSort} />
            </div>
            <Row>
               {products?.map(product => (
                  <ProductCard key={product._id} product={product} />
               ))}
            </Row>
         </Container>
      </div>
   )
}

export default Shop

