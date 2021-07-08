import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {loadWishList} from '../../actions/wishlist';
import Spinner from '../layout/Spinner';
import { logout } from '../../actions/login';
const AdminNav = ({handlePageChange,logout}) => {
  const [selectedNav, setSelectedNav] = useState('Manage Product Category')

  const handleNavChange = (selNav)=>{
    setSelectedNav(selNav)
    handlePageChange(selNav)
  }

  return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" active = {(selectedNav === 'Manage Product Category')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>{handleNavChange('Manage Product Category') }}
            >
                <i  className="fa fa-gear" aria-hidden="true"></i>  Manage Product Category
            </ListGroup.Item>

            <ListGroup.Item as="li" active = {(selectedNav === 'Add Product')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>{handleNavChange('Add Product') }}
            >
                <i  className="fa fa-plus-square" aria-hidden="true"></i> Add Product
            </ListGroup.Item>
            <ListGroup.Item as="li" active = {(selectedNav === 'Update Product')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>{handleNavChange('Update Product') }}
            >
                <i  className="fa fa-pencil" aria-hidden="true"></i> Update Product
            </ListGroup.Item>
            <ListGroup.Item as="li" active = {(selectedNav === 'Change User Roles')? true:false } style={{cursor:'pointer'}}
                onClick = {()=>{handleNavChange('Change User Roles') }}
            >
                <i  className="fa fa-cogs" aria-hidden="true"></i> Change User Roles
            </ListGroup.Item>


        </ListGroup>
    )
};

AdminNav.propTypes = {
    handlePageChange:PropTypes.func.isRequired,
    logout:PropTypes.func.isRequired
};
export default connect(null, {logout})(AdminNav)
// export default ProfileNav;
