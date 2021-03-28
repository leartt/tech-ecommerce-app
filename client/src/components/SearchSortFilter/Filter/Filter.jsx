import React from 'react'
import { Form } from 'react-bootstrap'

const Filter = () => {
   return (
      <div className="Filter">
         <Form>
            <Form.Control as="select">
               <option value="">Filter</option>
               <option value="Smartphone">Smartphone</option>
               <option value="Laptop">Laptop</option>
            </Form.Control>
         </Form>
      </div>
   )
}

export default Filter
