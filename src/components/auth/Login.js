import React, { Fragment, useState } from 'react';
import { Link, Redirect ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/login';
const Login = ({ setAlert, login, isAuthenticated, history} ) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if(email.length <=0 || password.length <=0){
      setAlert('Invalid Email / Password','danger')
    }else{
      login({email, password, history});
    }
  };
 
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </Fragment>
  );
};
Login.propTypes = {
  login:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
let mapStateToProps = state =>({
  isAuthenticated: state.login.isAuthenticated
})
// export default Login 
export default connect(mapStateToProps, { setAlert, login })(withRouter(Login));