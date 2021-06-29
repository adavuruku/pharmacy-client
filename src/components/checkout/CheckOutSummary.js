import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const CheckOutSummary =({productsList})=>{
    let total_amount = 0
    let naira = '&#8358;';
    const history = useHistory();
    let gotoCheckOut = ()=>{
        history.push('/checkout')
    }
    const products = productsList.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        let selPrice = discountPrice * product.quantity
        total_amount +=selPrice
        return (
            <li className="list-group-item d-flex justify-content-between lh-condensed"  key={product.inventoryId}>
                <div>
                    <h6 className="my-0">{product.productName}</h6>
                    <small className="text-muted"><span> &#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></span>  X  <span>{product.quantity}</span></small>
                </div>
                <span className="text-muted">&#8358; <NumberFormat value={selPrice} displayType={'text'} thousandSeparator={true} /></span>
            </li>)
    } );
    return (
            <div className="col-xs-12 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your Order Summarry</span>
                <span className="badge badge-success badge-pill p-2">{productsList.length} Items</span>
            </h4>
            <ul className="list-group mb-3">
                {products}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total </span>
                    <strong> &#8358; <NumberFormat value={total_amount} displayType={'text'} thousandSeparator={true} /> </strong>
                </li>
                <li className="list-group-item d-flex justify-content-centre">
                    <small style={{textAlign:'center', fontSize:'0.8em'}}>Add your Delivery address at checkout to see delivery charges</small>
                </li>
                <li className="list-group-item d-flex justify-content-between ">
                <Link to="/checkout"  className="btn btn-sm btn-success add-cart" onClick={() => gotoCheckOut()} >Continue to Checkout</Link>
                </li>
            </ul>

        </div>)
}

CheckOutSummary.propTypes = {
    productsList:PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    productsList: state.cart.cartItems
});
  
export default connect(mapStateToProps, {  })(CheckOutSummary);
// export default CartItem