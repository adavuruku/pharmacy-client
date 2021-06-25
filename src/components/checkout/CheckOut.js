import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect,useHistory } from 'react-router-dom';
import CheckOutItems from './CheckOutItems'
import CheckOutSummary from './CheckOutSummary'
import WishList from '../wishlist/WishList'
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const CheckOut = () => {
  return (
      <>
    <div class="row justify-content-between">
        <div class="col-md-4 order-md-2 mb-4">
                <CheckOutSummary/>
            </div>
        <div class="col-md-8 order-md-1 mb-8">
            <div class="row">
                <CheckOutItems/>
            </div>
        </div>
    </div>
    <div class="row justify-content-between mt-7">
        <h4>Saved For Later</h4>
        <WishList/>
    </div>
    </>
  );
};

export default CheckOut
