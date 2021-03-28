import {
   ORDER_ACTION_REQUEST,
   ORDER_ACTION_SUCCESS,
   ORDER_ACTION_FAILURE,
   GET_ALL_ORDERS,
   GET_SINGLE_ORDER,
   GET_USER_ORDERS,
   CHANGE_ORDER_STATUS,
} from './types';


import Axios from '../../axios';

export const getOrders = () => async dispatch => {
   try {
      dispatch({
         type: ORDER_ACTION_REQUEST,
      })

      const res = await Axios.get('/api/orders');
      if (res.data.success) {
         dispatch({
            type: GET_ALL_ORDERS,
            payload: {
               orders: res.data.orders,
            }
         })
         dispatch({
            type: ORDER_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: ORDER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const getUserOrders = (userId) => async dispatch => {
   try {
      dispatch({
         type: ORDER_ACTION_REQUEST,
      })

      const res = await Axios.get(`/api/orders/user/${userId}`);
      if (res.data.success) {
         dispatch({
            type: GET_USER_ORDERS,
            payload: {
               orders: res.data.orders,
            }
         })
         dispatch({
            type: ORDER_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: ORDER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const getOrderById = (id) => async dispatch => {
   try {
      dispatch({
         type: ORDER_ACTION_REQUEST,
      })

      const res = await Axios.get(`/api/orders/${id}`);
      if (res.data.success) {
         dispatch({
            type: GET_SINGLE_ORDER,
            payload: {
               order: res.data.order,
            }
         })
         dispatch({
            type: ORDER_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: ORDER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}

export const changeOrderStatus = ({ status, id }) => async dispatch => {
   try {
      dispatch({
         type: ORDER_ACTION_REQUEST,
      })

      const res = await Axios.put(`/api/orders/${id}/change-status`, { status });
      if (res.data.success) {
         dispatch({
            type: CHANGE_ORDER_STATUS,
            payload: {
               order: res.data.order,
            }
         })
         dispatch({
            type: ORDER_ACTION_SUCCESS,
            payload: res.data.message ? res.data.message : null
         })
      }
   } catch (error) {
      dispatch({
         type: ORDER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
}