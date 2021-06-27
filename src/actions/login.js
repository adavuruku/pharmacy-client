import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import { 
    REGISTER_FAIL, REGISTER_SUCCESS, 
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT, CLEAR_PROFILE
} from '../actions/types';

import setAuthToken from '../utils/setAuthToken'


export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }else{
        dispatch({
            type:AUTH_ERROR
        })
    }
}
export const register = ({firstName, lastName, email, phone, password,history }) => async dispatch => {
  const config = {
      headers:{
          'Content-Type':'application/json'
      } 
  }
  const body = JSON.stringify({firstName, lastName, email, phone, password})
  try {
      const res = await axios.post(`${baseUrl}/api/user/customer/register`, body, config)
      console.log(res.data)
      dispatch({
          type:REGISTER_SUCCESS,
          payload: res.data
      })
      // note to call another action from one action call dispatch(action)
    dispatch(loadUser()) //this will help set the headers down
    history.push('/home')
  } catch (error) {
    dispatch(setAlert('Email Already Exist','danger'))
    dispatch({
        type:REGISTER_FAIL
    })
  }
};


export const login = ({email, password,history}) => async dispatch => {
    // console.log('>-email ', email)
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post(`${baseUrl}/api/user/login`, body, config)
        console.log(res.data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser()) //load the axios header down with the new token
        history.push('/home')
        // console.log(history)
    } catch (error) {
        dispatch(setAlert('Invalid Email Address / Password', 'danger'))
        dispatch({
            type:LOGIN_FAIL
        })
    }
  };


  export const logout = () => async dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    })
      dispatch({
          type:LOGOUT
      })
  };

