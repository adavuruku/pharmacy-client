import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { removeItemFromWishList } from '../../actions/wishlist';
import { addItemToCart } from '../../actions/cart';
// key={product.inventoryId}
const WishListItems =({productItems, removeItemFromWishList, addItemToCart})=>{

    const removeProductFromWishList = (itemId)=>{
        console.log(itemId)
        removeItemFromWishList(itemId)
    }
    const addProductToCarts = (itemId)=>{
        // console.log(itemId)
        for (let i= 0, j = productItems.length; i < j; i++) {
            if (productItems[i].inventoryId == itemId) {
                // console.log(product[i])
                addItemToCart(productItems[i])
                break;
            }
        }
        
    }
    let naira = '&#8358;';
    const products = productItems.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        return (
            
            <div className="col-md-3 eachItem" key={product.inventoryId}>
                <div className="card mb-4 shadow-sm">
                    <div className="wishContainer">
                        <span className="percent">{product.productPercent}% OFF</span>
                        <span className="wish"><a  onClick={() => removeProductFromWishList(product.inventoryId)} href="#!"><i className="fa fa-heart heart"></i></a></span>
                    </div>
                    
                    <img src={product.productImage} className="rounded" alt= {product.productName} width="100%" />
                    <div className="card-body">
                        
                        <p className="card-text font-weight-bolder text-capitalize">{product.productName}</p>
                        <hr className="mb-1"/>
                        <div className="row">
                            <p className="card-text font-weight-light mt-0 mb-2">
                            <span ><strong>&#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></strong></span></p>
                        </div>
                        <hr className="mt-1 mb-2"/>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group add-cart">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addProductToCarts(product.inventoryId)}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
          )
    } );
    return (products)
}

WishListItems.propTypes = {
    removeItemFromWishList: PropTypes.func.isRequired,
    addItemToCart: PropTypes.func.isRequired,
    productItems:PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    productItems: state.wishlist.cartItems
});
  
export default connect(mapStateToProps, { removeItemFromWishList,addItemToCart})(WishListItems);
// export default CartItem