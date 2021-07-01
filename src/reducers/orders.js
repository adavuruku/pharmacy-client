import { ALL_ORDERS, EMPTY_ORDERS,SELECT_ORDER} from '../actions/types';
      
      const initialState = {
        totalOrders:0,
        selectedOrder:null,
        isOrderLoading:true,
        orders:[]
      };
      
function ordersReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ALL_ORDERS:
            return {
                ...state, orders:payload.orders, totalOrders:payload.orders.length, isOrderLoading:false
            }
        case SELECT_ORDER:
            let newOrderSelect = null
            for(let i=0, j = state.orders.length; i <j; i++){
                if(state.orders[i].receiptId === payload){
                    newOrderSelect = state.orders[i]
                    break
                }
            }
            // console.log('In Reducer -> ',payload,newOrderSelect)
            return {
            ...state, selectedOrder: newOrderSelect
            }
        case EMPTY_ORDERS:
            return {
                ...state, orders:[], totalOrders:0
            }
        default:
        return state;
    }
}

      
      export default ordersReducer;