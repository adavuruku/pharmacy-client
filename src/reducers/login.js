import { REGISTER_FAIL, REGISTER_SUCCESS, 
  USER_LOADED, AUTH_ERROR,
  LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT } from '../actions/types';

// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = {
  token:null,
  isAuthenticated:false,
  loading:true,
  user:null
};

function loginReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token',payload.tokenValue)
      return {
        ...state, token:payload.tokenValue, user:payload.userInformation, isAuthenticated:true, loading:false
      }
      
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state, token:null, user:null, isAuthenticated:false, loading:false
      }
    case USER_LOADED:
      return {
        ...state, isAuthenticated:true, loading:false, user:payload
      }
    default:
      return state;
  }
}


export default loginReducer;