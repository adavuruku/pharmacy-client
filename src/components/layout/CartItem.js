import React from 'react';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/cart';
import { addItemToWishList } from '../../actions/wishlist';
import Overlay from 'react-bootstrap/Overlay'
import Product from './Product';
// key={product.inventoryId}
const CartItem =({product, addItemToCart,addItemToWishList,isAuthenticated, history})=>{

    const addProductToCarts = (itemId)=>{
        for (let i= 0, j = product.length; i < j; i++) {
            if (product[i].inventoryId == itemId) {
                // console.log(product[i])
                addItemToCart(product[i])
                break;
            }
        }
        
    }

    const openProduct = (inventoryId)=>{
        // console.log('E DE HERE', inventoryId)
        if(inventoryId){
            history.push(`./products/${inventoryId}`)
            // <Redirect to='/somewhere'/>;
            // <Redirect to={`'./products/${inventoryId}'`}/>
        }
    }

    const addProductToWishList = (itemId)=>{
        if(isAuthenticated){
            addItemToWishList(itemId)
            return
        }else{
            alert('Login to Save Item')
        }
    }

    const products = product.map((product) =>(<Product key={product.inventoryId} product={product} 
        addProductToWishList = {addProductToWishList} openProduct={openProduct} addProductToCarts={addProductToCarts}/>));
    return (products)
}

CartItem.propTypes = {
    product: PropTypes.array.isRequired
};

CartItem.propTypes = {
    addItemToCart: PropTypes.func.isRequired,
    addItemToWishList: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired
};
  
const mapStateToProps = state => ({
    products: state.products.products,
    isAuthenticated:state.login.isAuthenticated
});
  
export default connect(mapStateToProps, { addItemToCart,  addItemToWishList})(withRouter(CartItem));
// export default CartItem