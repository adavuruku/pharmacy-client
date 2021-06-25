import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';

import { 
    ADD_TO_CART, REMOVE_FROM_CART, INCREASE_CART_ITEM_QUANTITY, DECREASECART_ITEM_QUANTITY,
    EMPTY_CART, SHOW_ALL_CART
} from '../actions/types';

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
