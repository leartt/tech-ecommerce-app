import {
   AUTH_ACTION_REQUEST, AUTH_ACTION_SUCCESS, AUTH_ACTION_FAILURE, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, SET_SHIPPING_DETAILS, AUTH_GET_PROFILE, AUTH_RESET_REQUEST_STATE
} from '../actions/types'

const initialState = {
   user: null,
   isLoggedIn: !!localStorage.getItem('token'),
   request: {
      loading: false,
      error: null,
      success: null
   },
   shippingDetails: JSON.parse(localStorage.getItem('shippingDetails')) || ''
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case AUTH_SIGNUP:
         return {
            ...state,
         }
      case AUTH_LOGIN:
         return {
            ...state,
            user: action.payload.user,
            isLoggedIn: true
         }
      case AUTH_LOGOUT:
         return {
            ...state,
            user: action.payload.user,
            isLoggedIn: action.payload.isLoggedIn
         }
      case AUTH_GET_PROFILE:
         return {
            ...state,
            user: action.payload.user || null
         }
      case SET_SHIPPING_DETAILS:
         localStorage.setItem("shippingDetails", JSON.stringify(action.payload.shippingDetails))
         return {
            ...state,
            shippingDetails: action.payload.shippingDetails
         }
      // case AUTH_GET_PROFILE:
      //     return {
      //         ...state,
      //         user: action.payload.user || null
      //     }
      // case AUTH_LOGOUT:
      //     return {
      //         ...state,
      //         user: action.payload.user,
      //         isLoggedIn: false
      //     }

      case AUTH_ACTION_REQUEST:
         return {
            ...state,
            request: {
               ...state.request,
               loading: true,
               error: null,
               success: null,
            }
         }
      case AUTH_ACTION_SUCCESS:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: null,
               success: action.payload || null
            }
         }
      case AUTH_ACTION_FAILURE:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: action.payload,
               success: null
            }
         }

      case AUTH_RESET_REQUEST_STATE:
         return {
            ...state,
            request: {
               loading: false,
               error: null,
               success: null,
            }
         }

      default:
         return state;
   }
}

export default authReducer;