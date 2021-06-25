import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';

import { 
    ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,
    EMPTY_WISHLIST
} from '../actions/types';

export const addItemToWishList = (cartItem) => async dispatch => {
    if(cartItem){
        dispatch({
            type:ADD_TO_WISHLIST,
            payload: cartItem
        })
    }
};

export const removeItemFromWishList = (inventoryId ) => async dispatch => {
    if(inventoryId){
        dispatch({
            type:REMOVE_FROM_WISHLIST,
            payload: inventoryId
        })
    }
};