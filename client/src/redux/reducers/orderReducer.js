import {
   ORDER_ACTION_REQUEST,
   ORDER_ACTION_SUCCESS,
   ORDER_ACTION_FAILURE,
   GET_ALL_ORDERS,
   GET_USER_ORDERS,
   GET_SINGLE_ORDER,
   CHANGE_ORDER_STATUS
} from '../actions/types';



const initialState = {
   orders: null,
   order: null,
   request: {
      loading: false,
      error: null,
      success: null
   }
}

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_ORDERS:
         return {
            ...state,
            orders: action.payload.orders,
         }

      case GET_SINGLE_ORDER:
         return {
            ...state,
            order: action.payload.order
         }

      case GET_USER_ORDERS:
         return {
            ...state,
            orders: action.payload.orders,
         }

      case CHANGE_ORDER_STATUS:
         return {
            ...state,
            order: action.payload.order
         }

      case ORDER_ACTION_REQUEST:
         return {
            ...state,
            request: {
               ...state.request,
               loading: true,
               error: null,
               success: null
            }
         }
      case ORDER_ACTION_SUCCESS:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: null,
               success: action.payload || null
            }
         }
      case ORDER_ACTION_FAILURE:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: action.payload,
               success: null
            }
         }
      default:
         return state;
   }
}

export default orderReducer;