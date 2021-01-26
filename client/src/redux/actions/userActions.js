import {
    AUTH_ACTION_REQUEST, AUTH_ACTION_SUCCESS, AUTH_ACTION_FAILURE, AUTH_SIGNUP, AUTH_LOGIN
} from './types'

import Axios from '../../axios';

export const signUpUser = (user) => async dispatch => {
    try {
        dispatch({
            type: AUTH_ACTION_REQUEST,
        })

        const res = await axios.post('/api/users/signup', user);
        if (res.data.success) {
            dispatch({
                type: AUTH_SIGNUP,
                payload: {
                    message: res.data.message,
                }
            })
            dispatch({
                type: AUTH_ACTION_SUCCESS,
                payload: res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_ACTION_FAILURE,
            payload: !error.response ? error.message : error.response.data.message
        })
    }
};

export const loginUser = ({ email, password }) => async dispatch => {
    // return new Promise(async (resolve, reject) => {
    try {
        dispatch({
            type: AUTH_ACTION_REQUEST,
        })

        const res = await axios.post('/api/users/login', { email, password });
        if (res.data.success) {
            const token = res.data.token;
            localStorage.setItem('token', token)

            // const { exp } = jwt.decode(token);
            // Calculate time exp of token and setTimeout to logout the user.
            // const timeToExpireInMs = (exp * 1000) - Date.now()
            // console.log(timeToExpireInMs)
            // logoutTimer = setTimeout(() => {
            //     dispatch(logoutUser())
            // }, timeToExpireInMs);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Getting token exp time to logout automatically after expire

            // setTimeout(() => {
            //     if (localStorage.getItem('token')) {
            //         dispatch(logoutUser('Your session has been ended. Login to continue'))
            //     }
            // }, timeToExpireInMs)

            dispatch({
                type: AUTH_LOGIN,
                payload: {
                    user: res.data.user,
                    token: token,
                }
            })
            dispatch({
                type: AUTH_ACTION_SUCCESS,
                payload: null
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_ACTION_FAILURE,
            payload: !error.response ? error.message : error.response.data.message
        })
    }
    // })

};