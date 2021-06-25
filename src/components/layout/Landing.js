import React, { Fragment, useEffect,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CartItem from './CartItem'
// import Product from './products'
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/products';


const Landing =({ getAllProducts, products})=>{
    const [ page, setPage ] = useState(1);

    const increasePage = () => setPage(page + 1);
    useEffect(() => {
        getAllProducts();
    }, [page]);
    console.log('>- ',products)
    return (
        <div className='row'>
           {/* {products} */}
           {products.length > 0 ? (<CartItem product={products} />) : (<h4>No profiles found...</h4>)}
        </div>
    )
}
Landing.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    // addItemToCart: PropTypes.func.isRequired,
    products:PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    products: state.products.products,
});
  
export default connect(mapStateToProps, { getAllProducts })(Landing);