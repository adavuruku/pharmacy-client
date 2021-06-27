import React from 'react';
import WishListItems from './WishListItems'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WishList = ({productItems}) => {
  const mystyle = {
        
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  };
  return productItems.length > 0 ? (
    <div class="row justify-content-between">
       <div class="row">
            <WishListItems/>
        </div>
    </div>
  ):(
    <div class="row justify-content-centre" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-shopping-cart" style={{fontSize: '5rem', color: 'red'}}></i></h1>
                <h5 className="card-title"><strong>Your cart is empty.</strong></h5>
                <p className="text-mute">You have not added any item to your cart.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  );
};

// export default CheckOut
WishList.propTypes = {
  productItems:PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  productItems: state.wishlist.cartItems
});

export default connect(mapStateToProps, null)(WishList);
