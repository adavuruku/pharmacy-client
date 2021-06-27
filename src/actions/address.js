import { setAlert } from './alert';
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import { 
    ADD_ADDRESS, ALL_ADDRESS,EMPTY_ADDRESS, AUTH_ERROR,SELECT_ADDRESS
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
export const addAddress = ({locationState, locationAddress, locationLocalGovt }) => async dispatch => {
  const config = {
      headers:{
          'Content-Type':'application/json'
      } 
  }
  const body = JSON.stringify({locationState, locationAddress, locationLocalGovt})
  try {
      const res = await axios.post(`${baseUrl}/api/user/location/add`, body, config)
    //   console.log(res.data)
    setAuthToken(localStorage.token)
      dispatch({
          type:ADD_ADDRESS,
          payload: res.data
      })
    // history.push('/home')
  } catch (error) {
  }
};

export const selectAddress = ({locationId }) => async dispatch => {
        dispatch({
            type:SELECT_ADDRESS,
            payload: locationId
        })
  };
export const loadAddress = () => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    // console.log(localStorage.token)
    setAuthToken(localStorage.token)
    try {
        const res = await axios.get(`${baseUrl}/api/user/location/all/1`, config)
        console.log(res.data)
        dispatch({
            type:ALL_ADDRESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
};

