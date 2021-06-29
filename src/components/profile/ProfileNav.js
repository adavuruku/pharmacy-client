import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {loadWishList} from '../../actions/wishlist';
import Spinner from '../layout/Spinner';
import { logout } from '../../actions/login';
const ProfileNav = ({handlePageChange,logout}) => {
  const [selectedNav, setSelectedNav] = useState('My Profile')

  const handleNavChange = (selNav)=>{
    setSelectedNav(selNav)
    handlePageChange(selNav)
  }

  return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" active = {(selectedNav == 'My Profile')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>{handleNavChange('My Profile') }}
            >
                <i  className="fa fa-user" aria-hidden="true"></i>  My Profile
            </ListGroup.Item>
            <ListGroup.Item as="li" active = {(selectedNav == 'Update Profile')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>handleNavChange('Update Profile') }
            >
                <i  className="fa fa-pencil-square-o" aria-hidden="true"></i>  Update Profile
            </ListGroup.Item>
            <ListGroup.Item as="li" active = {(selectedNav == 'My Address')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>handleNavChange('My Address') }
            >
                <i  className="fa fa-address-card" aria-hidden="true"></i>  My Address
            </ListGroup.Item>
            <ListGroup.Item as="li" active = {(selectedNav == 'Sign Out')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>logout() }
            >
                <i  className="fa fa-sign-out"   style={{color:'red'}} aria-hidden="true"></i>  Sign Out
            </ListGroup.Item>
        </ListGroup>
    )
};

ProfileNav.propTypes = {
    handlePageChange:PropTypes.func.isRequired,
    logout:PropTypes.func.isRequired
};
export default connect(null, {logout})(ProfileNav)
// export default ProfileNav;
