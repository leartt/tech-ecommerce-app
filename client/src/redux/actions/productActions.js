import {
    PRODUCT_ACTION_REQUEST,
    PRODUCT_ACTION_SUCCESS,
    PRODUCT_ACTION_FAILURE,
    ADD_PRODUCT,
    GET_PRODUCTS,
    GET_SINGLE_PRODUCT,
    GET_LATEST_PRODUCTS
} from './types';


import Axios from '../../axios';


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