import React, {Fragment,useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/login';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavBarTest =({login:{isAuthenticated, loading}, logout,totalItems,totalWishItems})=>{

    const authLinks = (
        <NavDropdown title="My Account" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#!1">
                <span className='hide-sm'>Hi Abdulraheem</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/profile">
                <i  className="fa fa-user" aria-hidden="true"></i>{' '}<span className='hide-sm'>My Profile</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="/my/orders">
                <i  className="fa fa-list" aria-hidden="true"></i>{' '}<span className='hide-sm'>My Orders</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="/wishlist">
                <i  className="fa fa-heart heart" style={{color:'brown'}} aria-hidden="true"></i>{' '}<span className='hide-sm'>My Saved Items {totalWishItems > 0 ? totalWishItems:''}</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="/logout">
                <i  className="fa fa-sign-out" style={{color:'red'}} aria-hidden="true"></i>{' '}<span className='hide-sm'>Sign Out</span>
            </NavDropdown.Item>
                
        </NavDropdown>
    )
    const guessLinks =(
        <Nav.Link className="btn btn-primary btn-sm" href="/wishlist">
            <i className="fa fa-sign-in" aria-hidden="true"></i> {' '} <span className='hide-sm'>Register / Login</span>
        </Nav.Link>
    )
    const pageWels = (
        <div className="jumbotron">
            <h1>Bootstrap Tutorial</h1>      
            <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile-first projects on the web.</p>
        </div>
    )

    return (
        <Navbar fixed="top" collapseOnSelect expand="md"  bg="dark" variant="dark">
        <Navbar.Brand ><Link to="/login">Mubby Pharmacy Store</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="nav-item ml-auto col-6">
                    <Nav.Link href="/cart">Home</Nav.Link>
                    {/* <Link to="/" className="nav-link" >Home</Link> */}
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="nav-item ml-auto justify-content-end col-6">
                        <Nav.Link className="btn btn-success btn-sm " href="/wishlist">
                        <i className="fa fa-shopping-cart" style={{color:'blue'}}></i> <span className="badge badge-light">{totalItems > 0 ? totalItems:''}</span>
                        </Nav.Link>

                    {!isAuthenticated? guessLinks: authLinks}
                </Nav>
            </Navbar.Collapse>
    </Navbar>
    )
}
Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    login:PropTypes.object
}
const mapStateToProps = state =>({
    login: state.login,
    totalItems: state.cart.totalItems,
    totalWishItems: state.wishlist.totalItems,
})
export default connect(mapStateToProps, {logout})(NavBarTest)
// export default Navbar