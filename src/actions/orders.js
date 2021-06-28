import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import { 
    ALL_ORDERS,EMPTY_ORDERS,SELECT_ORDER } from '../actions/types';

import setAuthToken from '../utils/setAuthToken'



export const loadOrders = () => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    // console.log(localStorage.token)
    setAuthToken(localStorage.token)
    try {
        const res = await axios.get(`${baseUrl}/api/user/my/orders/all/1`, config)
        console.log('load orders -> ',res.data)
        dispatch({
            type:ALL_ORDERS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
};

export const selectOrders = (orderId) => async dispatch => {
    console.log(orderId)
    dispatch({
        type:SELECT_ORDER,
        payload: orderId
    })
};

export const emptyOrders = () => async dispatch => {
    dispatch({
        type:EMPTY_ORDERS
    })
};

