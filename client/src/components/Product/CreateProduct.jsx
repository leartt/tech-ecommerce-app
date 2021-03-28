import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from 'redux/actions/productActions';
import { PRODUCT_RESET_REQUEST_STATE } from 'redux/actions/types';
import ProductForm from './ProductForm';

const CreateProduct = () => {
   const dispatch = useDispatch();

   const handleSubmit = (productData) => {
      const productFormData = new FormData();
      productFormData.set('short_name', productData.short_name)
      productFormData.set('long_name', productData.long_name)
      productFormData.set('description', productData.description)
      productFormData.set('price', productData.price)
      productFormData.set('releaseDate', productData.releaseDate)
      productFormData.set('category', productData.category)
      Object.values(productData.images).forEach(image => {
         productFormData.append('images', image, image.name)
      })

      dispatch(addProduct(productFormData))
   }

   useEffect(() => {
      return () => {
         dispatch({ type: PRODUCT_RESET_REQUEST_STATE })
      }
   }, [])

   return (
      <div>
         <ProductForm title="Create a new product" handleSubmit={handleSubmit} />
      </div>
   )
}

export default CreateProduct
