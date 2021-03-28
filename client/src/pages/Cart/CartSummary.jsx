import React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { cartTotalPriceSelector } from 'redux/reducers/cartReducer'

const CartSummary = ({ items }) => {
   return (
      <div className="CartSummary">
         <h6 className="CartSummary__heading"><MdShoppingCart /> Cart Summary</h6>
         {items.map(item => (
            <div className="cartItem" key={item._id}>
               <div>
                  <img className="image" src={`http://localhost:5500/${item.images[0]}`} alt="" />
                  <h5 className="description">{item.quantity} x {item.short_name}</h5>
               </div>
               <NumberFormat value={item.quantity * item.price}
                  displayType={'text'} thousandSeparator={true} prefix={'$'}
                  renderText={value => <h5 className="price"> {value}</h5>}
               />
            </div>
         ))}
         <h6 className="CartSummary__subtotal">Subtotal: <NumberFormat value={cartTotalPriceSelector(items)}
            displayType={'text'} thousandSeparator={true} prefix={'$'}
            renderText={value => <span> {value}</span>}
         /></h6>
      </div>
   )
}

export default CartSummary
