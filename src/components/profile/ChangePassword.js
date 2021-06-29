import React,{useState} from 'react';
import { connect } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';
import { updateProfilePassword  } from '../../actions/login';
// key={product.inventoryId}
const ChangePassword = ({ updateProfilePassword})=>{
      const [error, setError] = useState('')
      const [formData, setFormData] = useState({
        password: '',
        retypePassword: '',
        currentPassword:''
      });
    
      const { password, retypePassword, currentPassword } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const handlePasswordSubmit = () => {
        if(password.length <=5 || password !== retypePassword || currentPassword.length <=5){
            setError('Invalid Password Verify')
        }else{
            updateProfilePassword({password, currentPassword});
        }
      };
    return (
        <div className="row">
            <div className="col">
                <Alert>{error}</Alert>
                <Form onSubmit={e => e.preventDefault()}>
                    <Form.Row className="mb-2">
                        <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" onFocus={()=>setError('')} placeholder="Enter Current Password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="mb-2">
                        <Form.Group as={Col} controlId="exampleForm.ControlInput11">
                            <Form.Label>New Password <small className="text-mute"> (6 or more charater)</small></Form.Label>
                            <Form.Control type="password" onFocus={()=>setError('')} placeholder="Enter New Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.ControlInput100">
                            <Form.Label>Confirm Password <small className="text-mute"> (6 or more charater)</small></Form.Label>
                            <Form.Control type="password" onFocus={()=>setError('')} placeholder="Re-Enter Password"
                            name="retypePassword"
                            value={retypePassword}
                            onChange={onChange}
                            required
                            />
                        </Form.Group>
                        <Button onClick={handlePasswordSubmit} variant="primary mt-2" type="submit">
                            Update Password
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        </div>
        );
    }


ChangePassword.propTypes = {
    updateProfilePassword:PropTypes.func.isRequired
};
  
// export default CheckOutAddAddress;
export default connect(null, { updateProfilePassword},null)(ChangePassword);
// export default CartItem