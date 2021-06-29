import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { loadOrders,selectOrders } from '../../actions/orders';
import dateFormat from 'dateformat';
// key={product.inventoryId}
const OrdersItems = ({ordersList, loadOrders,selectOrders}) =>{
    // let receiptIdNo = loadOrders.length > 0 ? loadOrders[0].receiptId : null
    const [selectedOrders, isSelectedOrders] = useState(null)
    

    const handleChangeAddress = (receiptId)=>{
        isSelectedOrders(receiptId)
        selectOrders(receiptId)
    }
    const orders = ordersList.map((order) =>{
        // let ro = order.Items.reduce((accumulator, current) => accumulator + current.x, 0);
        let totalOrder = order.Items.reduce((accumulator, current) => accumulator + (current.unitPrice * current.quantity), 0);
        return (
            <div className="col" key={order.receiptId}>
                <div onClick={()=>handleChangeAddress(order.receiptId)} className={`card mb-4 p-3 shadow-sm border-${(selectedOrders === order.receiptId)? 'primary':'dark'}`}>
                    <div className="card-header">{dateFormat(order.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</div>
                    <div className={`card-body text-${(selectedOrders === order.receiptId)? 'primary':'dark'}`} >
                        <p className="card-text"><strong>Total : </strong>&#8358;  <NumberFormat value={totalOrder} displayType={'text'} thousandSeparator={true}/>.</p>
                        <p className="card-text"><strong>Order No. : </strong>{order.receiptId}. </p>
                        <p className="card-text"><strong>Payment Method. : </strong>{order.paymentType}.</p>
                        <p className="card-text"><strong>Delivery Address. : </strong><br/> 
                        {order.DeliveryLocation.locationLocalGovt} - {order.DeliveryLocation.locationState} <br/>
                        {order.DeliveryLocation.locationAddress}
                        </p>
                    </div>
                </div>
            </div>
            
          )
    } );
    return (
        <div>
            {orders}
        </div>
    )
}

OrdersItems.propTypes = {
    loadOrders: PropTypes.func.isRequired,
    selectOrders: PropTypes.func.isRequired,
    ordersList: PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    ordersList: state.orders.orders
});
  
export default connect(mapStateToProps, { loadOrders,selectOrders})(OrdersItems);
// export default CartItem