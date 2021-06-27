import React, {useState,useRef, useEffect} from 'react';
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CheckOutAddress from './CheckOutAddress'
import CheckOutPay from './CheckOutPay'
import { saveCart  } from '../../actions/cart';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const CheckOutSummaryTwo =({productsList,payType,selectedLocation, saveCart,history})=>{
    const [ ispayNow, setispayNow ] = useState(payType); //handle change in payment type selection
    const [ isStartPay, setisStartPay ] = useState(false);
    let total_amount = 0
    const callAllAddress = useRef(); //call Add Address dialog box in child component

    const callPayment = useRef(); //call payment dialog box in child component

    let naira = '&#8358;';
    // const history = useHistory();
    const payNowChange = () => setispayNow(!ispayNow);
    // const payOnDeliveryChange = () => setispayOnDelivery(!ispayOnDelivery);
    
    const products = productsList.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        let selPrice = discountPrice * product.quantity
        total_amount +=selPrice
    })

    const saveFinallyforPayOnDelivery = () => {
        // console.log('in here -> ',productsList,selectedLocation,ispayNow)
        setisStartPay(true)
        setTimeout(
            saveCart(productsList,selectedLocation,ispayNow, history)
        , 2000);
    }
  const deliveryInfo = (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Delivery Address
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <CheckOutAddress ref={callAllAddress}/>
                    <a href="#!" onClick={()=>callAllAddress.current.changeShow()} className="btn btn-sm btn-outline-secondary add-cart">Change Delivery Address</a>
                    {selectedLocation && (
                        <Card border="success mt-2 add-cart" >
                            <Card.Body>
                                <Card.Title>{selectedLocation.locationState} - {selectedLocation.locationLocalGovt}</Card.Title>
                                <Card.Text>
                                    {selectedLocation.locationAddress}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
  )
    return (
            <div className="col-xs-12 order-md-2 mb-4">
                {deliveryInfo}
            <ul className="list-group mb-3 mt-2">
                <li className="list-group-item d-flex justify-content-between">
                    <span>Payment Options </span>
                </li>
                {/* true -> Pay Now,  false -> Pay On Delivery */}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Pay Now </span>
                    <span><input class="form-check-input" type="radio" name="now" onChange={() => payNowChange()} checked ={ispayNow? true:false} value="option2"/></span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Pay On Delivery </span>
                    <span><input class="form-check-input" type="radio" name="delivery"  onChange={() => payNowChange()} checked ={ispayNow? false:true} value="option2"/></span>
                </li>
                
                <li className="list-group-item d-flex justify-content-between">
                    <span>Sub Total </span>
                    <strong> &#8358; <NumberFormat value={total_amount} displayType={'text'} thousandSeparator={true} /> </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Delivery Charges </span>
                    <strong> &#8358; <NumberFormat value={1000} displayType={'text'} thousandSeparator={true} /> </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total </span>
                    <strong> &#8358; <NumberFormat value={total_amount + 1000} displayType={'text'} thousandSeparator={true} /> </strong>
                </li>
                <CheckOutPay ref={callPayment}/>
                {console.log('Yea ',isStartPay)}
                <li className="list-group-item d-flex justify-content-between ">
                    {isStartPay ? 
                    (<Spinner className="text-centre" animation="grow" variant="dark" />):(<Link to="/checkout"  className="btn btn-sm btn-success add-cart" onClick = {()=>ispayNow ? callPayment.current.changeShow():saveFinallyforPayOnDelivery()} >{ispayNow? 'Continue Payment':'Place Order'} </Link>)}
                </li>
                
            </ul>

        </div>)
}

CheckOutSummaryTwo.propTypes = {
    productsList:PropTypes.array.isRequired,
    saveCart:PropTypes.func.isRequired,
    payType:PropTypes.bool.isRequired,
    selectedLocation:PropTypes.string.isRequired
}; 
  
const mapStateToProps = state => ({
    productsList: state.cart.cartItems,
    payType: state.cart.payType,
    selectedLocation: state.address.selectedLocation,
});
  
export default connect(mapStateToProps, {saveCart })(withRouter(CheckOutSummaryTwo));
// export default CartItem