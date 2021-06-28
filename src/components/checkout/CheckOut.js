import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutItems from './CheckOutItems'
import CheckOutSummary from './CheckOutSummary'

import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const CheckOut = ({cartItems}) => {

    const mystyle = {
        
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      };
      
  return cartItems.length > 0 ? (
    <div class="row justify-content-between" >
        <div class="col-md-9 order-md-1 mb-8">
            <div class="row">
                <CheckOutItems/>
            </div>
        </div>
        <div class="col-md-3 order-md-2 mb-4">
            <CheckOutSummary/>
        </div>
    </div>
  ):(
    <div class="row justify-content-centre" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-shopping-cart" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                <h5 className="card-title"><strong>Your cart is empty.</strong></h5>
                <p className="text-mute">You have not added any item to your cart.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  );
};

// export default CheckOut

CheckOut.propTypes = {
    cartItems: PropTypes.array
};
  
const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
});
  
// export default CheckOutAddAddress;
export default connect(mapStateToProps, null)(CheckOut);
