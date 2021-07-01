import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import setAuthToken from '../utils/setAuthToken'
import { 
    ADD_TO_WISHLIST, LOAD_WISH_LIST, REMOVE_FROM_WISHLIST,
    EMPTY_WISHLIST
} from '../actions/types';


export const addItemToWishList = (productId) => async dispatch => {
    console.log('E reach ',productId)
    if(productId){
        try {
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            setAuthToken(localStorage.token)
            const body = JSON.stringify({productId})
            const res = await axios.post(`${baseUrl}/api/user/wishlist/add`,body, config )
            // console.log(res.data)
            // dispatch({
            //     type:ADD_TO_WISHLIST,
            //     payload: cartItem
            // })
        } catch (error) {
            console.log(error)
        }

    }
};

export const loadWishList = () => async dispatch => {

    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    // console.log(localStorage.token)
    setAuthToken(localStorage.token)
    try {
        const res = await axios.get(`${baseUrl}/api/user/wishlist/all/1`, config)
        // console.log(res.data)
        dispatch({
            type:LOAD_WISH_LIST,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
};

export const removeItemFromWishList = (wishId ) => async dispatch => {
    if(wishId){
        if(window.confirm('Do you want to remove from your saved items?!')){
            try {
                //delete request with axios is always expected to be a param
                //but trying to send as body -> u have to add the body to the header config as data 
                // of the request
                const config = {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    data:{
                        wishId:`${wishId}`
                    } 
                }
            // console.log(localStorage.token)
                setAuthToken(localStorage.token)
                // const body = JSON.stringify({wishId})
                // console.log('remove',body)
                const res = await axios.delete(`${baseUrl}/api/user/wishlist/remove`,config )
                // console.log(res.data)
                dispatch({
                    type:REMOVE_FROM_WISHLIST,
                    payload: wishId
                })
            } catch (error) {
                console.log(error)
            }

        }
    }
};