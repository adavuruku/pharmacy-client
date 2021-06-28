import React,{useEffect, useRef,forwardRef,useState, useImperativeHandle,Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { loadOrders } from '../../actions/orders';
import dateFormat from 'dateformat';
// key={product.inventoryId}
const OrdersDetails = ({selectedOrder}) =>{
    // {
    //     "productId": "c408d78d-6a70-43b8-8a2d-4f2b04609b57",
    //     "quantity": 1,
    //     "unitPrice": "15000.00",
    //     "productInfo": {
    //         "productName": "Locatin",
    //         "productDescription": "Anti Malaria",
    //         "productMeasure": "Pack",
    //         "Category": {
    //             "categoryName": "Pneumon"
    //         }
    //     }
    // },
    const products = selectedOrder?.Items.map((product) =>{
        // let ro = order.Items.reduce((accumulator, current) => accumulator + current.x, 0);
        let totalOrder = product?.Items?.reduce((accumulator, current) => accumulator + (current.unitPrice * current.quantity), 0);
        return (
            <div className="col" key={product.productId}>
                <div  className='card mb-4 p-3 shadow-sm border-dark'>
                    <div className="card-header">{product.productInfo.productName}</div>
                    <div className='card-body text-dark' >
                        <p className="card-text"><strong>Quantity : </strong> {product.quantity} ({product.productInfo.productMeasure})</p>
                        <p className="card-text"><strong>Unit Price. : </strong>&#8358;  <NumberFormat value={product.unitPrice} displayType={'text'} thousandSeparator={true}/> </p>
                        <p className="card-text"><strong>Sub Total. : </strong>&#8358;  <NumberFormat value={product.unitPrice * product.unitPrice} displayType={'text'} thousandSeparator={true}/> </p>
                        <p className="card-text"><strong>Product Description. : </strong><br/> 
                        {product.productInfo.productDescription}
                        </p>
                    </div>
                </div>
            </div>
          )
    } );
    return (
        <div>
            {products}
        </div>
    )
}

OrdersDetails.propTypes = {
    selectedOrder: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    selectedOrder: state.orders.selectedOrder
});
  
export default connect(mapStateToProps, null)(OrdersDetails);
// export default CartItem