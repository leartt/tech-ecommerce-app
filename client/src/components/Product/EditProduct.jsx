import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, updateProduct } from 'redux/actions/productActions';
import { PRODUCT_RESET_REQUEST_STATE } from 'redux/actions/types';
import ProductForm from './ProductForm';

const EditProduct = ({ match }) => {
   const dispatch = useDispatch();

   const product = useSelector(state => state.product.product);
   const isLoading = useSelector(state => state.product.request.loading);

   const handleSubmit = (productData) => {
      const productToEdit = {
         id: product._id,
         short_name: productData.short_name,
         long_name: productData.long_name,
         description: productData.description,
         price: productData.price,
         releaseDate: productData.releaseDate,
         category: productData.category,
      }

      dispatch(updateProduct(productToEdit))
   }

   useEffect(() => {
      dispatch(getProduct(match.params.id))
      return () => {
         dispatch({ type: PRODUCT_RESET_REQUEST_STATE })
      }
   }, [])

   return (
      (!isLoading && product) && <div>
         <ProductForm product={product} title={`Edit product: ${product.short_name}`} handleSubmit={handleSubmit} />
      </div>
   )
}

export default EditProduct
