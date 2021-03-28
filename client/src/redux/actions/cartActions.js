import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './types'

export const addToCart = (product) => {
   return {
      type: ADD_TO_CART,
      payload: {
         product: product
      }
   }
}

export const removeFromCart = (product) => {
   return {
      type: REMOVE_FROM_CART,
      payload: {
         product: product
      }
   }
}

export const clearCart = () => {
   return {
      type: CLEAR_CART,
      payload: {
         cart: []
      }
   }
}