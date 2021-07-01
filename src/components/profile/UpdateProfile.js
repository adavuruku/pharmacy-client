import React,{useState} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';
import ChangePassword from './ChangePassword';
import { updateProfile  } from '../../actions/login';
// key={product.inventoryId}
const UpdateProfile = ({ updateProfile, userInfo})=>{
      const [error, setError] = useState('')
      const [formData, setFormData] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone
      });
    
      const { firstName, lastName,phone } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const handleProfileSubmit = () => {
        //   console.log('hereere')
        if(firstName.length <=0 || lastName.length <=0 || phone.length <=0){
            setError('Provide All the required Values')
        }else{
            updateProfile({firstName, lastName, phone});
        }
      };
    return (
        <div className="row bg-white p-2">
            <div className="col">
                <Alert>{error}</Alert>
                <Form onSubmit={e => e.preventDefault()}>
                    <Form.Row className="mb-2" >
                        <Form.Group as={Col} controlId="exampleForm.ControlInput10">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" 
                            name="email" onFocus={()=>setError('')}
                            value={userInfo.email}
                            disabled
                            />
                        </Form.Group>
                    </Form.Row >
                    <Form.Row className="mb-2" >
                        <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" onFocus={()=>setError('')} placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                    </Form.Row >
                    <Form.Row className="mb-2" >
                        <Form.Group as={Col} controlId="exampleForm.ControlInput4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" onFocus={()=>setError('')} placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row className="mb-2" >
                        <Form.Group as={Col} controlId="exampleForm.ControlInput4">
                            <Form.Label>Phone No</Form.Label>
                            <Form.Control type="phone" onFocus={()=>setError('')} placeholder="Last Name"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                        <Button onClick={handleProfileSubmit} variant="primary mt-2" >
                            Save Profile
                        </Button>
                    </Form.Row>
                </Form>
            </div>
            <div className="col">
                <ChangePassword/>
            </div>
        </div>
        );
    }


UpdateProfile.propTypes = {
    userInfo:PropTypes.object.isRequired,
    updateProfile:PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
    userInfo: state.login.user
});
  
// export default CheckOutAddAddress;
export default connect(mapStateToProps, { updateProfile},null)(UpdateProfile);
// export default CartItem