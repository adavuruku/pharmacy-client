import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({component:Component, auth:{isAuthenticated, loading, user}, ...rest}) =>{

  return (
    <Route {...rest} render={props=> !isAuthenticated || !user.isAdmin ? (<Redirect to='/login'/>) : (<Component {...props}/>)}/>
  )
    
}
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth:state.login
})

export default connect(mapStateToProps)(AdminRoute)