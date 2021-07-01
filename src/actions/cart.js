import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';

import { 
    ADD_TO_CART, REMOVE_FROM_CART, INCREASE_CART_ITEM_QUANTITY, DECREASECART_ITEM_QUANTITY,
    EMPTY_CART, SHOW_ALL_CART
} from '../actions/types';
import setAuthToken from '../utils/setAuthToken'

export const addItemToCart = (cartItem) => async dispatch => {
    if(cartItem){
        dispatch({
            type:ADD_TO_CART,
            payload: cartItem
        })
    }
};

export const removeItemFromCart = (inventoryId ) => async dispatch => {
    if(inventoryId){
        dispatch({
            type:REMOVE_FROM_CART,
            payload: inventoryId
        })
    }
};

export const increaseCartItemQuantity = (inventoryId ) => async dispatch => {
    if(inventoryId){
        dispatch({
            type:INCREASE_CART_ITEM_QUANTITY,
            payload: inventoryId
        })
    }
};

export const decreaseCartItemQuantity = (inventoryId) => async dispatch => {
    if(inventoryId){
        dispatch({
            type:DECREASECART_ITEM_QUANTITY,
            payload: inventoryId
        })
    }
};

export const saveCart = (allOrders, location,payType) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }

    let paymentType = payType?  'Card':'Cash on delivery'
    let locationId = location?.locationId
    
    let orders =[] 
    for(let i =0, j= allOrders.length; i <j; i++){
        let discountPrice = allOrders[i].productPrice - (allOrders[i].productPrice * ((allOrders[i].productPercent)/100));
        let newOrder ={
            // productId:allOrders[i].inventoryId,
            productId:'c408d78d-6a70-43b8-8a2d-4f2b04609b57',
            quantity:allOrders[i].quantity,
            unitPrice:discountPrice
        }
        orders.push(newOrder)
    }

    
    setAuthToken(localStorage.token)
    const body = JSON.stringify({orders, locationId, paymentType})
    // console.log('Item Action ',body)
    try {
        const res = await axios.post(`${baseUrl}/api/user/orders/save`, body, config)
        // console.log(res.data)
        dispatch({
            type:EMPTY_CART,
            payload: res.data
        })
    //   history.push('/home')
    } catch (error) {
    
    }
  };