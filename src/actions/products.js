// import { setAlert } from './alert';
import axios from 'axios'
import Product from '../utils/sampleProducts'
import { 
    GET_ALL_PRODUCT, PRODUCT_BY_CATEGORY
} from '../actions/types';


// Get all profiles
export const getAllProducts = (page = 1) => async (dispatch) => {
    // dispatch({ type: CLEAR_PROFILES })
    try {
        let limitStep = 10
        let offset = page * limitStep
        let limit = (page+1) * limitStep
        let products = Product.slice(offset, limit)

        // console.log(products);
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: products
        });
    
    } catch (err) {
    
    }
};