import React, {useState} from 'react';
import AdminNav from './adminNav'
import AdminAddCategory from './adminAddCategory'
import AddProduct from './addProduct'
import UpdateUsers from './updateUsers'
import UpdateProduct from './updateProduct'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {loadWishList} from '../../actions/wishlist';
import Spinner from '../layout/Spinner';

const Admin = () => {
    const [selectedPage, setSelectedPage] = useState('Manage Product Category')
    const handlePageChange = (selNav)=>{
            setSelectedPage(selNav)
    }
    return (
        <div class="row mt-5 bg-light p-4">
            <div className="col-3">
                <AdminNav handlePageChange={handlePageChange}/>
            </div>
            <div className="col-9" >
                
                {selectedPage === 'Manage Product Category' && <AdminAddCategory/>}
                {selectedPage === 'Add Product' && <AddProduct/>}
                {selectedPage === 'Change User Roles' && <UpdateUsers/>}
                {selectedPage === 'Update Product' && <UpdateProduct/>}
{/*selectedPage === 'My Address' && <ProfileAddress/>}
                {selectedPage === 'Update Profile' && <UpdateProfile/>} */}
            </div>
            
        </div>
    );
};



export default Admin;
