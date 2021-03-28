import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import ProductsTable from './ProductsTable';

const ProductForm = ({ product, handleSubmit, title }) => {

   const dispatch = useDispatch();

   const success = useSelector(state => state.product.request.success)
   const error = useSelector(state => state.product.request.error)


   const [productCategories, setProductCategories] = useState([
      'SMARTPHONE',
      'LAPTOP',
      "SMARTWATCH",
      "SMART TV"
   ])

   const [productData, setProductData] = useState({
      short_name: '',
      long_name: '',
      description: '',
      price: '',
      releaseDate: '',
      category: productCategories[0],
      images: [],
   })

   const clearForm = () => {
      setProductData({
         short_name: '',
         long_name: '',
         description: '',
         price: '',
         releaseDate: '',
         category: '',
         images: [],
      })
   }

   const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(productData.image)

      handleSubmit(productData)
   }

   useEffect(() => {
      if (success) {
         clearForm();
         window.scroll({ top: 0 })
      }
   }, [success])

   useEffect(() => {
      if (product) {
         setProductData({
            short_name: product.short_name,
            long_name: product.long_name,
            description: product.description,
            price: product.price,
            releaseDate: product.releaseDate,
            category: product.category,
            images: [],
         })
      }
   }, [])

   return (
      <div className="ProductForm">
         <Container>
            <div className="ProductForm__heading">
               <h1>{title}</h1>
               <p>Please, provide information needed to successfully create or edit a product.</p>
            </div>
            <hr />
            <Form onSubmit={handleFormSubmit}>
               {success && <Alert variant="success">{success}</Alert>}
               {error && <Alert variant="danger">{error}</Alert>}
               <Form.Group>
                  <Form.Label>Short Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product short name"
                     value={productData.short_name}
                     onChange={e => setProductData({ ...productData, short_name: e.target.value })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Long Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product long name"
                     value={productData.long_name}
                     onChange={e => setProductData({ ...productData, long_name: e.target.value })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" as="textarea" rows={6} style={{ resize: 'none' }} placeholder="Enter product long name"
                     value={productData.description}
                     onChange={e => setProductData({ ...productData, description: e.target.value })} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" placeholder="Enter product price"
                     value={productData.price}
                     onChange={e => setProductData({ ...productData, price: e.target.value })} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control type="datetime-local" placeholder="Enter product release date"
                     value={productData.releaseDate.substring(0, 16)}
                     onChange={e => setProductData({ ...productData, releaseDate: e.target.value })} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Choose product images</Form.Label>
                  <Form.Control type="file" multiple
                     onChange={e => setProductData({ ...productData, images: e.target.files })} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Choose product category</Form.Label>
                  <Form.Control as="select" value={productData.category}
                     onChange={e => setProductData({ ...productData, category: e.target.value })} >
                     {productCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                     ))}
                  </Form.Control>
               </Form.Group>
               <Button variant="danger" type="submit">Submit</Button>
            </Form>
         </Container>
      </div>
   )
}

export default ProductForm
