import React, {useEffect} from 'react';
import WishListItems from './WishListItems'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {loadWishList} from '../../actions/wishlist';
import Spinner from '../layout/Spinner';

const WishList = ({loadWishList, totalItems, isWishListLoading}) => {
  const mystyle = {
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  };
  useEffect(() => {
    loadWishList()
  },[])
  return !isWishListLoading?(totalItems > 0 ? (
    <div class="row justify-content-between mt-4">
       <div class="row">
            <WishListItems/>
        </div>
    </div>
  ):(
    <div class="row justify-content-centre mt-4" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-heart heart" style={{fontSize: '5rem', color: 'brown'}}></i></h1>
                <h5 className="card-title"><strong>Your wishlist is empty.</strong></h5>
                <p className="text-mute">You have not save any item to your wishlist.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  )):(<Spinner/>);
};

// export default CheckOut
WishList.propTypes = {
  loadWishList:PropTypes.func.isRequired,
  isWishListLoading:PropTypes.bool.isRequired,
  totalItems:PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  isWishListLoading:state.wishlist.isWishListLoading,
  totalItems:state.wishlist.totalItems
});

export default connect(mapStateToProps, {loadWishList})(WishList);
