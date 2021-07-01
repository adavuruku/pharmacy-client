// import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import setAuthToken from '../utils/setAuthToken'
// import Product from '../utils/sampleProducts'
import { 
    GET_ALL_PRODUCT, PRODUCT_BY_CATEGORY
} from '../actions/types';


// Get all profiles
export const getAllProducts = (page) => async (dispatch) => {
    // dispatch({ type: CLEAR_PROFILES })
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        // console.log(localStorage.token)
        // setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${baseUrl}/api/user/product/all/${page}`, config)
            // console.log('action',res.data.products, page)
            dispatch({
                type: GET_ALL_PRODUCT,
                payload: res.data.products
            });
        } catch (error) {
            console.log(error)
        }
    } catch (err) {
    
    }
};


export const getAllProductsByFilter = (selectedSearch) => async (dispatch) => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        const body = JSON.stringify({filter:selectedSearch.filter, page:selectedSearch.page})
        // console.log(body)
        try {
            const res = await axios.patch(`${baseUrl}/api/user/product/filter`,body, config)
            // console.log('action',res.data.products, page)
            dispatch({
                type: GET_ALL_PRODUCT,
                payload: {products:res.data.products, page:selectedSearch.page}
            });
        } catch (error) {
            console.log(error)
        }
    } catch (err) {
    
    }
};