import {
    PRODUCT_ACTION_REQUEST,
    PRODUCT_ACTION_SUCCESS,
    PRODUCT_ACTION_FAILURE,
    ADD_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_SINGLE_PRODUCT,
    GET_LATEST_PRODUCTS,
    AUTH_ACTION_FAILURE
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

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload.product,
            }
        case PRODUCT_ACTION_REQUEST:
            return {
                ...state,
                request: {
                    ...state.request,
                    loading: true,
                    error: null,
                    success: null
                }
            }
        case PRODUCT_ACTION_SUCCESS:
            return {
                ...state,
                request: {
                    ...state.request,
                    loading: false,
                    error: null,
                    success: action.payload || null
                }
            }
        case PRODUCT_ACTION_FAILURE:
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

export default productReducer;