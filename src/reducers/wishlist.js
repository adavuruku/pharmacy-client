import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,EMPTY_WISHLIST} from '../actions/types';
      
const initialState = {
    totalItems:0,
    cartItems:[]
};

function cartReducer(state = initialState, action) {
const { type, payload } = action;

switch (type) {
    case ADD_TO_WISHLIST:
        let cartList = [...state.cartItems]
        let found = false
        for (let i= 0, j = cartList.length; i < j; i++) {
            if (cartList[i].inventoryId == payload.inventoryId) {
                found =true
                break;
            }
        }
        if(!found){
            const newItem = {...payload}
            cartList.push(newItem)
        }
        found = false
        return {
        ...state, cartItems:cartList, totalItems:cartList.length
        }
    case REMOVE_FROM_WISHLIST:
        let newcartList = [...state.cartItems]
        for (let i= 0, j = newcartList.length; i < j; i++) {
            if (newcartList[i].inventoryId == payload) {
                newcartList.splice(i,1)
                break;
            }
        }
        return {
            ...state, cartItems:newcartList, totalItems:newcartList.length
        }
    case EMPTY_WISHLIST:
    return {
        ...state, cartItems:[], totalItems:0
    }
    default:
    return state;
}
}


export default cartReducer;