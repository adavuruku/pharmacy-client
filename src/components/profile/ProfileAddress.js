import React,{useEffect, useRef,forwardRef,useState, useImperativeHandle,Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import { loadAddress,selectAddress  } from '../../actions/address';
import Spinner  from '../layout/Spinner';
// key={product.inventoryId}
const ProfileAddress = ({locations, loadAddress, isAddressLoading})=>{
    
    const mystyle = {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      };
    useEffect(() => {
        loadAddress()
    },[])

    const loc = locations.map((location) =>{
        return (
            <div className="col-8" key={location.locationId}>
                <div className='card mb-4 p-3 shadow-sm border-primary'>
                    <div className='card-body text-dark' >
                        <h5 className="card-title">{location.locationState} - {location.locationLocalGovt}</h5>
                        <p className="card-text">{location.locationAddress}.</p>
                    </div>
                </div>
            </div>
            
          )
    } );

   
    return (
        isAddressLoading? (<Spinner/>): loc.length > 0? (<div className="bg-white p-2" >{loc}</div>):(
            <div class="row justify-content-centre" style={mystyle}>
                <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
                    <div className="card-body">
                        <h1><i className="fa fa-shopping-cart" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                        <h5 className="card-title"><strong>Your Address is empty.</strong></h5>
                        <p className="text-mute">You have not add Any Address to your profile.</p>
                        <a href="#!" className="btn btn-sm btn-outline-secondary">Add New Address</a>
                    </div>
                </div>
            </div>)
    )
}

ProfileAddress.propTypes = {
    loadAddress: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    isAddressLoading:PropTypes.bool.isRequired
};
  
const mapStateToProps = state => ({
    locations: state.address.locations,
    isAddressLoading:state.address.isAddressLoading
});
  
export default connect(mapStateToProps, {loadAddress},null)(ProfileAddress);
// export default CartItem