import React,{useEffect, useRef,forwardRef,useState, useImperativeHandle,Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import CheckOutAddAddress from './CheckOutAddAddress';
import PropTypes from 'prop-types';
import { loadAddress,selectAddress  } from '../../actions/address';
import Spinner  from '../layout/Spinner';
// key={product.inventoryId}
const CheckOutAddress = forwardRef(({locations, selectedLocation, loadAddress,selectAddress, isAddressLoading},allAddressReff)=>{
    const childRef = useRef();

    const mystyle = {
        
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      };
    const localAllAddress = useRef()

    const [show, setShow] = useState(false);

    // const [selecectedLoc, setSelectedLoc] = useState('dark');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeAddress = (locationId)=>{
        selectAddress({locationId})
    }
    useImperativeHandle(allAddressReff, () => {
        return {
            changeShow: ()=>{
                handleShow()
            }
        }
      });


    useEffect(() => {
        loadAddress()
    },[])

    const loc = locations.map((location) =>{
        return (
            <div className="col-md-6" key={location.locationId}>
                <div onClick={()=>handleChangeAddress(location.locationId)} className={`card mb-4 p-3 shadow-sm border-${(selectedLocation.locationId === location.locationId)? 'primary':'dark'}`}>
                    <div className={`card-body text-${(selectedLocation.locationId === location.locationId)? 'primary':'dark'}`} >
                        <h5 className="card-title">{location.locationState} - {location.locationLocalGovt}</h5>
                        <p className="card-text">{location.locationAddress}.</p>
                    </div>
                </div>
            </div>
            
          )
    } );
    return (
        <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                <h4>Select A Delivery Address / <a href="#!" onClick={()=>childRef.current.changeShow()} className="btn btn-sm btn-outline-secondary">Add New Address</a></h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{overflow:"auto"}}>
                    <CheckOutAddAddress ref={childRef}/>
                    {isAddressLoading? (<Spinner/>): loc.length > 0? (loc):(
                        <div class="row justify-content-centre" style={mystyle}>
                            <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
                                <div className="card-body">
                                    <h1><i className="fa fa-shopping-cart" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                                    <h5 className="card-title"><strong>Your Address is empty.</strong></h5>
                                    <p className="text-mute">You have not add Any Address to your profile.</p>
                                    <a href="#!" onClick={()=>childRef.current.changeShow()} className="btn btn-sm btn-outline-secondary">Add New Address</a>
                                </div>
                            </div>
                        </div>
                    )

                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        )
})

CheckOutAddress.propTypes = {
    loadAddress: PropTypes.func.isRequired,
    selectAddress: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    isAddressLoading:PropTypes.bool.isRequired,
    selectedLocation: PropTypes.string
};
  
const mapStateToProps = state => ({
    locations: state.address.locations,
    selectedLocation: state.address.selectedLocation,
    isAddressLoading:state.address.isAddressLoading
});
  
export default connect(mapStateToProps, { loadAddress,selectAddress},null,{forwardRef:true})(CheckOutAddress);
// export default CartItem