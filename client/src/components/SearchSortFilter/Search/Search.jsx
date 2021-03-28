import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
const Search = ({ handleSearch }) => {

   const searchInputRef = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();
      const searchQuery = searchInputRef.current.value
      handleSearch(searchQuery)
   }

   return (
      <div className="Search">
         <Form onSubmit={handleSubmit}>
            <Form.Control
               type="text"
               placeholder="Search any product"
               ref={searchInputRef}
            />
         </Form>
      </div>
   )
}

export default Search
