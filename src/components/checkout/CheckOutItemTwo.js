import React,{Fragment, Section} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { decreaseCartItemQuantity, 
    increaseCartItemQuantity, removeItemFromCart  } from '../../actions/cart';
    import { addItemToWishList } from '../../actions/wishlist';
// key={product.inventoryId}
const CheckOutItems =({productItems, removeItemFromCart, increaseCartItemQuantity,decreaseCartItemQuantity,addItemToWishList,history})=>{

    const removeProductFromCart = (itemId)=>{
        removeItemFromCart(itemId)
    }

    const incrementQuantity = (itemId)=>{
        increaseCartItemQuantity(itemId)
        
    }

    const decreaseQuantity = (itemId)=>{
        decreaseCartItemQuantity(itemId)
    }

    const addProductToWishList = (itemId)=>{
        addItemToWishList(itemId)
        removeItemFromCart(itemId)
    }
    const openProduct = (inventoryId)=>{
        // console.log('E DE HERE', inventoryId)
        if(inventoryId){
            history.push(`./products/${inventoryId}`)
        }
    }
    let counter = 0
    const products = productItems.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        let totalAmount = discountPrice * product.quantity
        counter += 1
        return (
            <Fragment key={product.inventoryId}>
                <tr class="thead-light trow">
                    <td scope="row" colspan="2">Delivery {counter} of {productItems.length}</td>
                    <td>Quantity</td>
                    <td>Item Price</td>
                    <td>Action</td>
                </tr>
                <tr>
                    <td height ="150px" width="180px" scope="row"><img style={{cursor:'pointer'}} onClick={()=>openProduct(product.inventoryId)} height ="150px" width="180px"   alt={product.productName}src={product.productImage} /></td>
                    <td>{product.productName}</td>
                    <td><p>
                        <a href="#!" onClick={() => incrementQuantity(product.inventoryId)} className="btn btn-sm btn-outline-secondary">+</a>
                        <span> {product.quantity} </span>
                        <a href="#!" onClick={() => decreaseQuantity(product.inventoryId)} class="btn btn-sm btn-outline-secondary">-</a>
                        </p>
                    </td>
                    <td><p>&#8358; <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true} /><br/>
                    <span className="text-mute">&#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></span> X {product.quantity} Item </p>
                    </td>
                    <td><p><a href="#!" className="btn btn-sm btn-outline-secondary" onClick={() => removeProductFromCart(product.inventoryId)}>Remove Item</a></p>
                    <p><a href="#!" className="btn btn-sm btn-outline-secondary" onClick={() => addProductToWishList(product.inventoryId)}>Save For Later</a></p>
                    </td>
                </tr>
            </Fragment>
          )
          
    });
    return (
        <table className="table">
            <thead>
                <th colspan="5"><i class="fa fa-table" aria-hidden="true"></i> Review Your Order</th>
            </thead>
            <tbody>
                {products}
            </tbody>
        </table>
    )
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
    increaseCartItemQuantity, removeItemFromCart ,addItemToWishList})(withRouter(CheckOutItems));
// export default CartItem