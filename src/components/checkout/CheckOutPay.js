import React,{useEffect, forwardRef, useRef,useState, useImperativeHandle,Fragment} from 'react';
import { connect } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NumberFormat from 'react-number-format';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card';

import { saveCart  } from '../../actions/cart';
// key={product.inventoryId}
const CheckOutPay = forwardRef(({ cart,selectedLocation, saveCart},ref)=>{

    const localPayRef = useRef()
    const [show, setShow] = useState(false);

    const [ isStartPay, setisStartPay ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let total_amount = 0
    const products = cart.cartItems.map((product) =>{
        let discountPrice = product.productPrice - (product.productPrice * ((product.productPercent)/100));
        let selPrice = discountPrice * product.quantity
        total_amount +=selPrice
    })

    useImperativeHandle(ref, () => {
        return {
            changeShow: ()=>{
                handleShow()
            }
        }
      });
      const [error, setError] = useState('')
      const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        cardCvv: '',
        cardExpiry: ''
      });
    
      const { cardName, cardNumber,cardCvv, cardExpiry } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const handleSubmit = () => {
        // e.preventDefault();
        if(cardName.length <=5 || cardNumber.length <=15 || cardCvv.length < 3 || cardExpiry.length <5){
            setError('Provide Valid Card Information')
            setisStartPay(false)
        }else{
            // saveCart(cart.cartItems,selectedLocation,true,history)
            setisStartPay(true)
            setTimeout(() => {
                saveCart(cart.cartItems,selectedLocation,true)
                handleClose()
              }, 10000);
        }
      };
    
    // console.log('BAA REF',localInputRef)
    return (
        <Fragment  >
            <Modal size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show}  onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Provide Credit Card Detail</h5>
                    {error.length >0 && (
                    <Alert variant='danger'>
                        {error}
                    </Alert>)
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card border="success mt-2 mb-4 add-cart" >
                        <Card.Body>
                            <Card.Title>Amount To Pay : &#8358; <NumberFormat value={total_amount + 1000} displayType={'text'} thousandSeparator={true}/></Card.Title>
                            <Card.Text>
                                Note: The amount on this form covers the cost of items in your cart and delivery charges to your choice of selected location. You can cancel this order after five (5) working days of placing the order and your refund will be processed immediately. Thanks
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Form>
                        <div className="row mb-2">
                            <div className="col">
                                <input type="text" disabled = {isStartPay? 'diabled':''} onFocus={()=>setError('')}  name="cardName" className="form-control" placeholder="Name On Card"
                                    value={cardName}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <input type="number" disabled = {isStartPay? 'diabled':''} onFocus={()=>setError('')} name="cardNumber" className="form-control" placeholder="Card Number"
                                    value={cardNumber}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="form-group col">
                                <input type="text" disabled = {isStartPay? 'diabled':''} onFocus={()=>setError('')} name="cardExpiry" className="form-control" placeholder="11/20"
                                value={cardExpiry}
                                onChange={onChange}
                                required
                                />
                            </div>
                            <div className="form-group col">
                                <input type="number" disabled = {isStartPay? 'diabled':''} onFocus={()=>setError('')} name="cardCvv" className="form-control" placeholder="CVV"
                                value={cardCvv}
                                onChange={onChange}
                                required
                                />
                            </div>
                        </div>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                
                {isStartPay ? 
                    (<Spinner className="text-centre" animation="grow" variant="dark" />):(
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Confirm Payment
                            </Button>
                        </>
                )}
                
                </Modal.Footer>
            </Modal>
        </Fragment>
        );
    })

CheckOutPay.propTypes = {
    saveCart: PropTypes.func.isRequired,
    cart: PropTypes.object,
    selectedLocation:PropTypes.string.isRequired
};
  
const mapStateToProps = state => ({
    cart: state.cart,
    selectedLocation: state.address.selectedLocation
});
  
// export default CheckOutAddAddress;
export default connect(mapStateToProps, { saveCart},null,{forwardRef:true})(CheckOutPay);
// export default CartItem