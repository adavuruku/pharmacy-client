import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import { loadOrders } from './orders';
import { 
    REGISTER_FAIL, REGISTER_SUCCESS, 
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, USER_UPDATE_INFO_SUCCESS, LOGIN_FAIL,LOGOUT, CLEAR_PROFILE,
    EMPTY_ORDERS, EMPTY_ADDRESS, EMPTY_WISHLIST, EMPTY_CART
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
    //   console.log(res.data)
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
// updateProfilePassword
export const updateProfilePassword = ({currentPassword, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    const body = JSON.stringify({password, currentPassword})
    setAuthToken(localStorage.token)
    try {
        const res = await axios.patch(`${baseUrl}/api/user/customer/update/password`, body, config)
        // console.log(res.data)
        alert('Password Updated')
    } catch (error) {
      alert('Fail To Update Password')
    }
  };
export const updateProfile = ({firstName, lastName, phone, selectedFile,isImageChange}) => async dispatch => {
    const config = {headers:{'Content-Type':'multipart/form-data'}}
    // const body = JSON.stringify({firstName, lastName, phone})
    try {
        setAuthToken(localStorage.token)
        const formDataHere = new FormData();
        formDataHere.append('firstName', firstName);
        formDataHere.append('lastName', lastName);
        formDataHere.append('phone', phone);
        if(isImageChange){
            formDataHere.append('profileImage',selectedFile)
        }
        const res = await axios.patch(`${baseUrl}/api/user/customer/update`, formDataHere, config)
        // console.log(res.data)
        dispatch({
            type:USER_UPDATE_INFO_SUCCESS,
            payload: res.data
        })
        alert('Profile Updated')
    } catch (error) {
      console.log(error)
      alert('Fail to Update Profile')
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
        // console.log(res.data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        //load all the user parameters - orders, wishlist, address, profile
        // dispatch(loadOrders())
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


  export const logout = (history) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    try {
        setAuthToken(localStorage.token)
        const res = await axios.get(`${baseUrl}/api/user/logout`, config)
        dispatch({
            type:EMPTY_ORDERS
        })
        dispatch({
            type:EMPTY_CART
        })
        dispatch({
            type:EMPTY_ADDRESS
        })
        dispatch({
            type:EMPTY_WISHLIST
        })
        dispatch({
            type:LOGOUT
        })
        history.push('/home')
    } catch (error) {
        dispatch(setAlert('Unable to Sign Out Retry', 'danger'))
    }
    
  };

