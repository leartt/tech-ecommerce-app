import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

const Sort = ({ handleSort }) => {

   return (
      <div className="Sort">
         <Form>
            <Form.Control as="select" onChange={(e) => handleSort(e.target.value)}>
               <option value="Default">Default</option>
               <option value="newest">Newest</option>
               <option value="priceAsc">Price Highest</option>
               <option value="priceDesc">Price Lowest</option>
            </Form.Control>
         </Form>
      </div>
   )
}

export default Sort
