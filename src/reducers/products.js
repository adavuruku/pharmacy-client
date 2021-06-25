import { GET_ALL_PRODUCT, PRODUCT_BY_CATEGORY } from '../actions/types';
  
  // reducers define the content in the redux stores
  // more of a table in the db(store)
  const initialState = {
      products:[],
      loading:false
  };
  
  function productReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_PRODUCT:
      case PRODUCT_BY_CATEGORY:
        return {
            ...state, products:payload,loading:false
        }
      default:
        return state;
    }
  }
  
  
  export default productReducer;