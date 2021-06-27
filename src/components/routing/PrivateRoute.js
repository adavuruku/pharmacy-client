import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({component:Component, auth:{isAuthenticated, loading}, ...rest}) =>{
  // console.log(isAuthenticated, 'authyyyy')
  // const myObj = {
  //   name: 'John Doe',
  //   age: 35,
  //   sex: 'M',
  //   dob: new Date(1990, 1, 1)
  // };
  // const { Username: name, ...rest } = myObj
  // ...rest it means assign all the value send in props to ...rest
  return (
    <Route {...rest} render={props=> !isAuthenticated ? (<Redirect to='/login'/>) : (<Component {...props}/>)}/>
  )
    
}
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth:state.login
})

export default connect(mapStateToProps)(PrivateRoute)