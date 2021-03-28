import React from 'react'

import { Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'

const ProductsTable = ({ products }) => {

   return (
      products && <div className="ProductsTable">
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Image</th>
                  <th>Short Name</th>
                  <th>Date Created</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {products.map(product => (
                  <tr key={product._id}>
                     <td><img src={`http://localhost:5500/${product.images[0]}`} alt="" /></td>
                     <td>{product.short_name}</td>
                     <td>{product.createdAt.replace('T', ' ')}</td>
                     <td>{product.category}</td>
                     <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <td>{value}</td>} />
                     <td><Link to={`/product/edit/${product._id}`}>Details</Link></td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </div>
   )
}

export default ProductsTable
