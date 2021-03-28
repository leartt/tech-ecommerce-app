import {
   PRODUCT_ACTION_REQUEST,
   PRODUCT_ACTION_SUCCESS,
   PRODUCT_ACTION_FAILURE,
   CREATE_PRODUCT,
   GET_PRODUCTS,
   GET_PRODUCT,
   GET_LATEST_PRODUCTS,
   UPDATE_PRODUCT
} from './types';


import Axios from '../../axios';

export const getProducts = ({ productName = "", productSort = "" }) => async dispatch => {
   try {
      dispatch({
         type: PRODUCT_ACTION_REQUEST,
      })

      const res = await Axios.get(`/api/products?name=${productName}&sort=${productSort}`)
      if (res.data.success) {
         dispatch({
            type: GET_PRODUCTS,
            payload: {
               products: res.data.products,
            }
         })
         dispatch({
            type: PRODUCT_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: PRODUCT_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const getLatestProducts = () => async dispatch => {
   try {
      dispatch({
         type: PRODUCT_ACTION_REQUEST,
      })

      const res = await Axios.get('/api/products/latest');
      if (res.data.success) {
         dispatch({
            type: GET_LATEST_PRODUCTS,
            payload: {
               latestProducts: res.data.latestProducts,
            }
         })
         dispatch({
            type: PRODUCT_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: PRODUCT_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const getProduct = (id) => async dispatch => {
   try {
      dispatch({
         type: PRODUCT_ACTION_REQUEST,
      })

      const res = await Axios.get(`/api/products/${id}`);
      if (res.data.success) {
         dispatch({
            type: GET_PRODUCT,
            payload: {
               product: res.data.product,
            }
         })
         dispatch({
            type: PRODUCT_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: PRODUCT_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const addProduct = (product) => async dispatch => {
   try {
      dispatch({
         type: PRODUCT_ACTION_REQUEST,
      })

      const res = await Axios.post('/api/products', product);
      if (res.data.success) {
         dispatch({
            type: CREATE_PRODUCT,
            payload: {
               products: res.data.products,
            }
         })
         dispatch({
            type: PRODUCT_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: PRODUCT_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const updateProduct = (product) => async dispatch => {
   try {
      dispatch({
         type: PRODUCT_ACTION_REQUEST,
      })

      const res = await Axios.put(`/api/products/${product.id}`, product);
      if (res.data.success) {
         dispatch({
            type: UPDATE_PRODUCT,
            payload: {
               product: res.data.product,
            }
         })
         dispatch({
            type: PRODUCT_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: PRODUCT_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}