import React, { Fragment, useEffect,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CartItem from './CartItem'
// import Product from './products'
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/products';

import debounce from 'lodash.debounce';


const Landing =({ getAllProducts, products,loadMore})=>{
    const [ page, setPage ] = useState(1);

    // const increasePage = () => setPage(page + 1);
    useEffect(() => {
        getAllProducts(page);
    }, [page]);

    window.onscroll = debounce(() => {
        // console.log('c why -> ',window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
        // console.log('c why2 -> ',parseInt(document.getElementsByTagName('body')[0].getBoundingClientRect().bottom) <= parseInt(window.innerHeight))
        // return parseInt(el.getBoundingClientRect().bottom) <= parseInt(window.innerHeight);
        if (parseInt(document.getElementsByTagName('body')[0].getBoundingClientRect().bottom) <= parseInt(window.innerHeight)) {
        //   console.log('Call Again')
          if(loadMore){
            setPage(page + 1)
          }else{
            getAllProducts(page);
          }
        }
      }, 100);
    // console.log('>- ',products)
    return (
        <div className='row mt-4'>
           {/* {products} */}
           {products.length > 0 ? (<CartItem product={products} />) : (<h4>No product found...</h4>)}
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
    loadMore: state.products.loadMore,
});
  
export default connect(mapStateToProps, { getAllProducts })(Landing);