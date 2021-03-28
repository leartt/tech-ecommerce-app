import { combineReducers } from "redux";
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import authReducer from "./authReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   product: productReducer,
   cart: cartReducer,
   order: orderReducer
})

export default rootReducer;