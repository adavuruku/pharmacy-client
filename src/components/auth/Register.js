import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/login';
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component
// import { useHistory } from "react-router-dom";

const Register = ({ setAlert, register, isAuthenticated,history}) => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    phone:'',
    password: '',
    password2: ''
  });
  const {firstName, lastName, email, phone, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email.length <= 0 || firstName.length <= 0 || lastName.length <= 0 || password2.length <= 0 || password.length <= 0) {
      setAlert('Passwords do not match', 'danger');
    } else if(password !== password2){
      setAlert('Invalid Data Input', 'danger');
    }else{
      register({firstName, lastName, email, phone, password, password2, history });
    }
  };
//redirrect to Dashboard if user is in
// if(isAuthenticated){
//   return <Redirect to="/dashboard"/>
// }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="phone"
            placeholder="Phone No."
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </Fragment>
  );
};

//define the compoment proptypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

let mapStateToProps = state =>({
  isAuthenticated: state.login.isAuthenticated
})
// export default connect(mapStateToProps, { setAlert, register })(Register);
export default connect(mapStateToProps, { setAlert, register })(withRouter(Register));
