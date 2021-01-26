import {
    PRODUCT_ACTION_REQUEST,
    PRODUCT_ACTION_SUCCESS,
    PRODUCT_ACTION_FAILURE,
    ADD_PRODUCT,
    GET_PRODUCTS,
    GET_SINGLE_PRODUCT,
    GET_LATEST_PRODUCTS
} from '../actions/types';



const initialState = {
    products: null,
    product: null,
    latestProducts: null,
    request: {
        loading: false,
        error: null,
        success: null
    }
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LATEST_PRODUCTS:
            return {
                ...state,
                latestProducts: action.payload.latestProducts,
            }

        default:
            return state;
    }
}

export default productReducer;