import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import avatar from '../chat/avatar.png';
// key={product.inventoryId}
const ProfileInfo =({userInfo})=>{
        return (
            <Card>
                <Card.Header as="h5">Your Profile Information {userInfo.status && <Badge pill variant="success" className="p-2">Active</Badge>}</Card.Header>
                <Card.Body>
                <div className="row">
                    <div className="col-7">
                        <Card.Title>{userInfo.firstName} {userInfo.lastName}</Card.Title>
                        <Card.Text>
                            <p>{userInfo.phone}</p>
                            <p>{userInfo.email}</p>

                            <p>Account Role(s)</p>
                            <hr/>
                        </Card.Text>
                        <Badge pill variant="primary" className="p-2">Customer</Badge> 
                        {userInfo.isAdmin && <Badge pill variant="primary" className="p-2">Admin</Badge>}
                        {userInfo.isConsultant && <Badge pill variant="primary" className="p-2">Consultant</Badge>}
                    </div>
                    <div className="col-4">
                        <img src={userInfo.profileImage?userInfo.profileImage:avatar} style={{height:'15rem', width:'15rem'}} className="img-thumbnail" width="100%" />
                    </div>

                </div>
                </Card.Body>
            </Card>
          );
}

ProfileInfo.propTypes = {
    userInfo:PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    userInfo: state.login.user
});
  
export default connect(mapStateToProps, null)(ProfileInfo);
// export default CartItem