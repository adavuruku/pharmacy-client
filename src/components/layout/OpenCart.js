import React,{ useState, useEffect} from 'react';
import { Link, Redirect,useParams,withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/cart';
import { addItemToWishList } from '../../actions/wishlist';
import Spinner from './Spinner';
import Product from './Product';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';

const OpenCart =({isAuthenticated, addItemToCart,  addItemToWishList,history})=>{
    const [product, setProducts] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [relatedItems, setrelatedItems] = useState([])

    let { inventoryId } = useParams();

    // const params = useParams();

    const mystyle = {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    };

    useEffect(() => {
        fetchProduct(inventoryId)
      }, [inventoryId])
      //loading categories
      const fetchProduct = async (inventoryId) => {
            setisLoading(true)
          if(inventoryId){
            const config = {headers:{'Content-Type':'application/json'}}
            try {
                const res = await axios.get(`${baseUrl}/api/user/open/product/${inventoryId}`, config)
                let catego = res.data.product
                let relatedList = res.data.related
                setProducts(catego)
                setrelatedItems(relatedList)
            } catch (error) {
              console.log(error)
            }
            setisLoading(false)
          }
        
      };
    const addProductToCarts = (itemId)=>{
        addItemToCart(itemId)
    }

    const openProduct = (inventoryId)=>{
        // console.log('E DE HERE', inventoryId)
        if(inventoryId){
            history.push(`/products/${inventoryId}`)
            // <Redirect to='/somewhere'/>;
            // <Redirect to={`'./products/${inventoryId}'`}/>
        }
    }

    const addProductToWishList = (itemId)=>{
        if(isAuthenticated){
            addItemToWishList(itemId)
            return
        }else{
            alert('Login to Save Item')
        }
    }

    

    let notFound = (<div class="row justify-content-centre" style={mystyle}>
            <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
                <div className="card-body">
                    <h1><i className="fa fa-ban" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                    <h5 className="card-title"><strong>Ooops !!!.</strong></h5>
                    <p className="text-mute">The resource you are looking for is not available.</p>
                    <Link to="/home" className="btn btn-primary">View Products</Link>
                </div>
                </div>
            </div>)

    
    let discountPrice = product?.productPrice - (product?.productPrice * ((product?.productPercent)/100));

    const products = relatedItems.map((product) =>(<Product key={product.inventoryId} product={product} 
        addProductToWishList = {addProductToWishList} openProduct={openProduct} addProductToCarts={addProductToCarts}/>));

    return isLoading? (<Spinner/>):product?(
        <div className="row">
        <div className="row mt-5 bg-light p-4">
            <div className="col-4">
                <img src={product.productImage} className="rounded img-responsive"  alt= {product.productName} />
            </div>
            <div className="col-8 bg-white p-3" >
                <p className="card-text font-weight-bolder text-capitalize mb-3"><strong>Category </strong> : {product.productName}</p>
                <p className="card-text font-weight-bolder text-capitalize mb-3"><strong>Product Name </strong> : {product.productName}</p>
                
                <p className="card-text font-weight-bolder text-capitalize mb-3">Actual Price : <small className="text-muted"> &#8358; <del>  <NumberFormat value={product.productPrice} displayType={'text'} thousandSeparator={true}/></del></small>
                </p>
                <p className="card-text font-weight-bolder text-capitalize mb-3">Discount Price : <strong>&#8358; <NumberFormat value={discountPrice} displayType={'text'} thousandSeparator={true} /></strong>
                </p>
                <p className="card-text font-weight-bolder text-capitalize mb-3">Discount Percent : <strong>{product.productPercent} %</strong>
                </p>
                <p className="card-text font-weight-bolder text-capitalize mb-3">Description <br/>
                <strong>{product.productDescription}</strong>
                </p>
                <div className="d-flex align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addProductToCarts(product)}>Add To Cart</button>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addProductToWishList(product.inventoryId)}>Add To Wish List</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <h5 className="mt-10">Related Products</h5>
            {products}
        </div>
        </div>
    ):(notFound)
    // return (products)
}


OpenCart.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addItemToCart: PropTypes.func.isRequired,
    addItemToWishList: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({
    isAuthenticated:state.login.isAuthenticated
});
  
export default connect(mapStateToProps,{ addItemToCart,  addItemToWishList})(withRouter(OpenCart));