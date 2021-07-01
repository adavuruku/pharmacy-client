import { GET_ALL_PRODUCT, PRODUCT_BY_CATEGORY } from '../actions/types';
  
  // reducers define the content in the redux stores
  // more of a table in the db(store)
  const initialState = {
      products:[],
      loading:false,
      loadMore:true
  };
  
  function productReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_PRODUCT:
      case PRODUCT_BY_CATEGORY:
        state.loadMore = payload.products.length > 0 ? true:false
        console.log('from the state',state.products, payload,state.loadMore)
        // state.products = state.products.concat(payload)
        // console.log('from the state',state.products, payload)
        if(payload.page ===1){
          return {
            ...state,products:[...payload.products], loading:false
          }
        }else{
          return {
              ...state,products:[...state.products, ...payload.products], loading:false
          }
        }
      default:
        return state;
    }
  }
  
  
  export default productReducer;