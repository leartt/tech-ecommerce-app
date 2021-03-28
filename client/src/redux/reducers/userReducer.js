import { USER_ACTION_REQUEST, USER_ACTION_SUCCESS, USER_ACTION_FAILURE, GET_USERS, GET_USER_BY_ID, UPDATE_USER, DELETE_USER } from '../actions/types'


const initialState = {
   users: [],
   user: null,
   request: {
      loading: false,
      error: null,
      success: null
   },
}

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USERS:
         return {
            ...state,
            users: action.payload.users
         }
      case GET_USER_BY_ID:
         return {
            ...state,
            user: action.payload.user,
         }


      case USER_ACTION_REQUEST:
         return {
            ...state,
            request: {
               ...state.request,
               loading: true,
               error: null,
               success: null,
            }
         }
      case USER_ACTION_SUCCESS:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: null,
               success: action.payload || null
            }
         }
      case USER_ACTION_FAILURE:
         return {
            ...state,
            request: {
               ...state.request,
               loading: false,
               error: action.payload,
               success: null
            }
         }

      // case USER_RESET_REQUEST_STATE:
      //    return {
      //       ...state,
      //       request: {
      //          loading: false,
      //          error: null,
      //          success: null,
      //       }
      //    }

      default:
         return state;
   }
}

export default userReducer;