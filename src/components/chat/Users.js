import React,{useHistory} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/cart';
import { addItemToWishList } from '../../actions/wishlist';
import Overlay from 'react-bootstrap/Overlay'
import { withRouter } from "react-router";
// import './Chat.css';
import avatar from './avatar.png';
// key={product.inventoryId}
const Users =({user,onUserClicked})=>{
    
    const consultant = (
            <a href="#" key={user.userId} onClick ={()=> onUserClicked(user)} className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start">
                    <img src={user.profileImage ? user.profileImage : avatar} className="rounded-circle mr-4" style={{marginRight:'18px'}} alt= {user.firstName + " " + user.lastName} width="40" height="40"/>
                    <div className="flex-grow-1 ml-1">
                    {user.firstName + " " + user.lastName}   {user.unreadmessage > 0? (<div style={{float:'right',padding:'5px'}} className="badge bg-success float-right">{user.unreadmessage}</div>):''}
                        <div className="small">
                            {user.online? (<span><i class="fa fa-circle chat-online" aria-hidden="true"></i> Online</span>):(<span><i class="fa fa-circle chat-offline" aria-hidden="true"></i>Offline</span>)}
                            {user.isConsultant? (<span> - Expert</span>):(<span></span>)}
                        </div>
                    </div>
                </div>
            </a>
    );
    return (consultant)
}

Users.propTypes ={
    user: PropTypes.object.isRequired,
    onUserClicked: PropTypes.func.isRequired
};

  
export default Users;
// export default CartItem