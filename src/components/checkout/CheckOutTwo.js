import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutItemTwo from './CheckOutItemTwo'
import CheckOutSummaryTwo from './CheckOutSummaryTwo'

import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const CheckOutTwo = ({cartItems}) => {
    const mystyle = {
        
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      };
  return cartItems.length > 0 ? (
    <div class="row justify-content-between">
        <div class="col-md-9 order-md-1 mb-8">
                <CheckOutItemTwo/>
        </div>
        <div class="col-md-3 order-md-2 mb-4">
            <CheckOutSummaryTwo/>
        </div>
    </div>
  ):(
    <div class="row justify-content-centre" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-check-square-o" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                <h5 className="card-title"><strong>Your order is succesfully placed.</strong></h5>
                <p className="text-mute">You can start a new transaction.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  );
};
CheckOutTwo.propTypes = {
    cartItems: PropTypes.array
};
  
const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
});
// export default CheckOutTwo
export default connect(mapStateToProps, null)(CheckOutTwo);
