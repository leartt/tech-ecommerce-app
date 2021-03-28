import { USER_ACTION_REQUEST, USER_ACTION_SUCCESS, USER_ACTION_FAILURE, GET_USERS, GET_USER_BY_ID, UPDATE_USER, DELETE_USER } from './types'

import Axios from 'axios.js'

export const getUsers = () => async dispatch => {
   try {
      dispatch({
         type: USER_ACTION_REQUEST,
      })

      const res = await Axios.get('/api/users');
      if (res.data.success) {
         dispatch({
            type: GET_USERS,
            payload: {
               message: res.data.message,
               users: res.data.users
            }
         })
         dispatch({
            type: USER_ACTION_SUCCESS,
            payload: res.data.message
         })
      }
   } catch (error) {
      dispatch({
         type: USER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
};

export const getUsersById = (id) => async dispatch => {
   try {
      dispatch({
         type: USER_ACTION_REQUEST,
      })

      const res = await Axios.post(`/api/users/${id}`,);
      if (res.data.success) {
         dispatch({
            type: GET_USERS,
            payload: {
               message: res.data.message,
               user: res.data.user
            }
         })
         dispatch({
            type: USER_ACTION_SUCCESS,
            payload: res.data.message
         })
      }
   } catch (error) {
      dispatch({
         type: USER_ACTION_FAILURE,
         payload: !error.response ? error.message : error.response.data.message
      })
   }
};