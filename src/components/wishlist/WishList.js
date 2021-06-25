import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect,useHistory } from 'react-router-dom';
import WishListItems from './WishListItems'
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const CheckOut = () => {
  return (
    <div class="row justify-content-between">
       <div class="row">
            <WishListItems/>
        </div>
    </div>
  );
};

export default CheckOut
