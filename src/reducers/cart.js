import { ADD_TO_CART, REMOVE_FROM_CART, 
    EMPTY_CART, INCREASE_CART_ITEM_QUANTITY, DECREASECART_ITEM_QUANTITY, SHOW_ALL_CART } from '../actions/types';
      
      const initialState = {
        totalItems:0,
        cartItems:[],
        payType:false,
      };
      //if paytyoe is true then is payOnDelivery else payWithCard
      function cartReducer(state = initialState, action) {
        const { type, payload } = action;
      
        switch (type) {
            case ADD_TO_CART:
                let cartList = [...state.cartItems]
                let found = false
                for (let i= 0, j = cartList.length; i < j; i++) {
                    if (cartList[i].inventoryId == payload.inventoryId) {
                        found =true
                        cartList[i].quantity += 1;
                        break;
                    }
                }
                if(!found){
                    const newItem = {...payload}
                    newItem.quantity = 1
                    cartList.push(newItem)
                }
                found = false
                return {
                ...state, cartItems:cartList, totalItems:cartList.length
                }
            case REMOVE_FROM_CART:
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
            case INCREASE_CART_ITEM_QUANTITY:
                console.log(state)
                let newcartListINCQTY = [...state.cartItems]
                for (let i= 0, j = newcartListINCQTY.length; i < j; i++) {
                    if (newcartListINCQTY[i].inventoryId == payload) {
                        newcartListINCQTY[i].quantity +=1
                        break;
                    }
                }
                return {
                    ...state, cartItems:newcartListINCQTY, totalItems:newcartListINCQTY.length
                  }
            case DECREASECART_ITEM_QUANTITY:
                let newcartListDECQTY = [...state.cartItems]
                for (let i= 0, j = newcartListDECQTY.length; i < j; i++) {
                    if (newcartListDECQTY[i].inventoryId == payload) {
                        if(newcartListDECQTY[i].quantity <= 1){
                            newcartListDECQTY.splice(i,1)
                        }else{
                            newcartListDECQTY[i].quantity -=1
                        }
                        break;
                    }
                }
                return {
                    ...state, cartItems:newcartListDECQTY, totalItems:newcartListDECQTY.length
                }
          case EMPTY_CART:
            return {
              ...state, cartItems:[], totalItems:0, payType:false
            }
          default:
            return state;
        }
      }
      
      
      export default cartReducer;