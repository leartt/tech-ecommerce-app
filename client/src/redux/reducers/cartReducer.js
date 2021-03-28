import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';


const initialState = {
   cart: JSON.parse(localStorage.getItem('cart')) || []
}

export const cartTotalPriceSelector = (cart) => {
   return cart.reduce((amount, item) => (item.price * item.quantity) + amount, 0);
}

export const cartTotalItemsSelector = (cart) => {
   return cart.reduce((amount, item) => item.quantity + amount, 0)
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TO_CART:
         let newCartItems = [...state.cart];

         if (!state.cart.find(cartItem => cartItem._id === action.payload.product._id)) {
            newCartItems.push({ ...action.payload.product, quantity: 1 })
         }
         else {
            const index = newCartItems.findIndex(cartItem => cartItem._id === action.payload.product._id);

            newCartItems[index].quantity++;
         }
         localStorage.setItem("cart", JSON.stringify(newCartItems))
         return {
            ...state,
            cart: newCartItems
         }

      case REMOVE_FROM_CART:
         let cartItems = [...state.cart];
         const index = cartItems.findIndex(cartItem => cartItem._id === action.payload.product._id);

         if (action.payload.product.quantity > 1) {
            cartItems[index].quantity--;
         }
         else {
            cartItems.splice(index, 1)
         }

         localStorage.setItem("cart", JSON.stringify(cartItems))
         return {
            ...state,
            cart: cartItems
         }

      case CLEAR_CART:
         localStorage.removeItem("cart")
         return {
            ...state,
            cart: action.payload.cart
         }
      default:
         return state;
   }
}

export default cartReducer;