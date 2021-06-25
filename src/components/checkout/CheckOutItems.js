import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { decreaseCartItemQuantity, 
    increaseCartItemQuantity, removeItemFromCart  } from '../../actions/cart';
    import { addItemToWishList } from '../../actions/wishlist';
// key={product.inventoryId}
const CheckOutItems =({productItems, removeItemFromCart, increaseCartItemQuantity,decreaseCartItemQuantity,addItemToWishList})=>{

    const removeProductFromCart = (itemId)=>{
        console.log(itemId)
        removeItemFromCart(itemId)
    }

    const incrementQuantity = (itemId)=>{
        console.log(itemId)
        increaseCartItemQuantity(itemId)
        
    }

    const decreaseQuantity = (itemId)=>{
        console.log(itemId)
        decreaseCartItemQuantity(itemId)
    }

    const addProductToWishList = (itemId)=>{
        // console.log(itemId)
        for (let i= 0, j = productItems.length; i < j; i++) {
            if (productItems[i].inventoryId == itemId) {
                // console.log(product[i])
                addItemToWishList(productItems[i])
                break;
            }
        }
        
    }
    let naira = '&#8358;';
    const products = productItems.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        return (
            
            <div className="col-md-4 eachItem" key={product.inventoryId}>
                <div className="card mb-4 shadow-sm">
                    <div className="wishContainer">
                        <span className="percent">{product.productPercent}% OFF</span>
                        <span className="wish"><a  onClick={() => addProductToWishList(product.inventoryId)} href="#!"><i className="fa fa-heart heart"></i></a></span>
                    </div>
                    
                    <img src={product.productImage} className="rounded" alt={product.productName} width="100%" />
                    <div className="card-body">
                        
                        <p className="card-text font-weight-bolder text-capitalize">{product.productName}</p>
                        <hr className="mb-1"/>
                        <div className="row">
                        <p className="card-text font-weight-light mt-0 mb-2">
                            <span ><strong>&#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></strong></span>
                            <small class="text-muted amountRight">  <a href="#!" onClick={() => incrementQuantity(product.inventoryId)} className="btn btn-sm btn-outline-secondary">+</a><span> {product.quantity} </span><a href="#!" onClick={() => decreaseQuantity(product.inventoryId)} class="btn btn-sm btn-outline-secondary">-</a></small></p>
                            <hr className="mt-1 mb-2"/>
                            </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group add-cart">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => removeProductFromCart(product.inventoryId)}>Remove From Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
          )
    } );
    return (products)
}

CheckOutItems.propTypes = {
    decreaseCartItemQuantity: PropTypes.func.isRequired,
    removeItemFromCart: PropTypes.func.isRequired,
    increaseCartItemQuantity: PropTypes.func.isRequired,
    addItemToWishList: PropTypes.func.isRequired,
    productItems:PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    productItems: state.cart.cartItems
});
  
export default connect(mapStateToProps, { decreaseCartItemQuantity, 
    increaseCartItemQuantity, removeItemFromCart ,addItemToWishList})(CheckOutItems);
// export default CartItem