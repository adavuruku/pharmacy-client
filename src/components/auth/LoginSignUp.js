import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect,useHistory } from 'react-router-dom';
// import {useHistory } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import Login from './Login'
import Register from './Register'
import Landing from '../layout/Landing'
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const LoginSignUp = () => {
    // let history = useHistory();
    // if(isAuthenticated == true){
    //     history.push('/home')
    // }
    // console.log(isAuthenticated)
    let isAuthenticPage = (
            <Fragment>
                <Landing/>
            </Fragment>
    )
    let signUpInPage = (
        <Fragment>
            <div className="row">
                <div className="col-md-5 col-sm-12 bg-light p-3 m-3">
                    <Login/>
                </div>
                <div className="col-md-5 col-sm-12 bg-light p-3 m-3">
                    <Register/>
                </div>
            </div>
        </Fragment>
      );
  return (
    //   isAuthenticated != false ? signUpInPage:isAuthenticPage
      signUpInPage
  );
};

// LoginSignUp.propTypes={
//     isAuthenticated:PropTypes.bool
// }
// const mapStateToProps = state =>({
//     isAuthenticated: state.login.isAuthenticated
// })
// export default connect(mapStateToProps,{})(LoginSignUp)
export default LoginSignUp
