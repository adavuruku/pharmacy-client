import React,{useHistory} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/cart';
import { addItemToWishList } from '../../actions/wishlist';
import Overlay from 'react-bootstrap/Overlay'
import { withRouter } from "react-router";
// key={product.inventoryId}
const Product =({product, addProductToWishList,openProduct,addProductToCarts})=>{

    let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
    const products = (
            <div className="col-md-3" >
                <div  className="card mb-4 shadow-sm">
                    <div className="wishContainer">
                        <span className="percent">{product.productPercent}% OFF</span>
                        <span className="wish"><a  onClick={() => addProductToWishList(product.inventoryId)} href="#!"><i className="fa fa-heart heart"></i></a></span>
                    </div>
                    
                    <img src={product.productImage} style={{cursor:'pointer'}} onClick={()=>openProduct(product.inventoryId)} className="rounded img-responsive"  alt= {product.productName} />
                    <div className="card-body">
                        <p className="card-text font-weight-bolder text-capitalize">{product.productName}</p>
                        <hr className="mb-1"/>
                        <p className="card-text font-weight-light mt-0 mb-0">
                            <span ><strong>&#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></strong></span>
                            <small className="text-muted amountRight"> &#8358; <del>  <NumberFormat value={product.productPrice} displayType={'text'} thousandSeparator={true}/></del></small></p>
                            <hr className="mt-1 mb-3"/>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group add-cart">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addProductToCarts(product.inventoryId)}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
    return (products)
}

Product.propTypes ={
    addProductToCarts: PropTypes.func.isRequired,
    addProductToWishList: PropTypes.func.isRequired,
    openProduct: PropTypes.func.isRequired,
    // isAuthenticated:PropTypes.bool.isRequired
};

  
export default Product;
// export default CartItem