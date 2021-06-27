import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect,useHistory } from 'react-router-dom';
import CheckOutAddress from './CheckOutAddress'
import CheckOutItemTwo from './CheckOutItemTwo'
import CheckOutSummaryTwo from './CheckOutSummaryTwo'
import WishList from '../wishlist/WishList'
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const CheckOutTwo = () => {
  return (
    <div class="row justify-content-between">
        <div class="col-md-9 order-md-1 mb-8">
                <CheckOutItemTwo/>
        </div>
        <div class="col-md-3 order-md-2 mb-4">
            <CheckOutSummaryTwo/>
        </div>
    </div>
  );
};

export default CheckOutTwo
