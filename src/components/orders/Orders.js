import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrdersItems from './OrdersItems'
import OrdersDetails from './OrdersDetails'
import { loadOrders } from '../../actions/orders';
import Spinner from '../layout/Spinner';

// import CheckOutSummary from './CheckOutSummary'

import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const Orders = ({ordersItems, isOrderLoading, loadOrders}) => {

    const mystyle = {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    };

    useEffect(() => {
        loadOrders()
    },[])
      
  return !isOrderLoading ? (ordersItems.length > 0 ? (
    <div class="row justify-content-between mt-4" >
        <div class="col-md-6 order-md-1 mb-8" >
            <h5>Your Order Receipt</h5>
            <div class="row" style={{maxHeight:'40rem',overflow:'auto' }}>
                <OrdersItems/>
            </div>
        </div>
        <div class="col-md-6 order-md-2 mb-4" >
            <h5>The Order Products</h5>
            <div class="row" style={{maxHeight:'40rem',overflow:'auto' }}>
                
                <OrdersDetails/>
            </div> 
        </div>
    </div>
  ):(
    <div class="row justify-content-centre" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-list" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                <h5 className="card-title"><strong>You are yet to place Any Order.</strong></h5>
                <p className="text-mute">You order list is empty, you can start creating orders by adding items to your cart.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  )):(<Spinner/>);
};

// export default CheckOut

Orders.propTypes = {
    ordersItems: PropTypes.array,
    isOrderLoading:PropTypes.bool.isRequired,
    loadOrders: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
    ordersItems: state.orders.orders,
    isOrderLoading:state.orders.isOrderLoading
});
  
// export default CheckOutAddAddress;
export default connect(mapStateToProps, {loadOrders})(Orders);
