import React, { Fragment, useEffect,useState,useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CartItem from './CartItem'
// import Product from './products'
import PropTypes from 'prop-types';
import { getAllProducts,getAllProductsByFilter } from '../../actions/products';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
import debounce from 'lodash.debounce';
import Spinner from './Spinner';


const Landing =({ getAllProducts, getAllProductsByFilter, products,loadMore})=>{
    let searchy = {
        "filter":{
            "category":"All",
            "range":null
        },
        page:1
    }
    const [ page, setPage ] = useState(1);
    const [categories, loadCategories] = useState([])
    const [selectedSearch, changeSearch] = useState(searchy)
    const [categoryId, setCategory] = useState('All')
    const [range, setRange] = useState({
        start:0,
        end:0
    })
    // const [price, setPrice] = useState({
    //     from:'',
    //     to:''
    // })
    
    const {start,end} = range;
    // const increasePage = () => setPage(page + 1);
    useEffect(() => {
        getAllProductsByFilter(selectedSearch)
    }, [selectedSearch]);


    //fet product categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const config = {headers:{'Content-Type':'application/json'}}
        try {
            const res = await axios.get(`${baseUrl}/api/user/category/all/1`, config)
            let catego = [...res.data.categories]
            loadCategories(catego)
        } catch (error) {
          console.log(error)
        //   setError('Fail To Add Category')
        }
    };
    document.getElementsByTagName('body')[0].onscroll = debounce(() => {
        // console.log('c why -> ',window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
        // console.log('c why2 -> ',parseInt(document.getElementsByTagName('body')[0].getBoundingClientRect().bottom) <= parseInt(window.innerHeight))
        // return parseInt(el.getBoundingClientRect().bottom) <= parseInt(window.innerHeight);
        if (parseInt(document.getElementsByTagName('body')[0].getBoundingClientRect().bottom) <= parseInt(window.innerHeight)) {
        //   console.log('Call Again')
          if(loadMore){
            // setPage(page + 1)
            selectedSearch.page += 1
            changeSearch({...selectedSearch})
          }else{
            getAllProductsByFilter(selectedSearch);
          }
        }
      }, 100);


        const handleRangeChange = () =>{
            // console.log(from==0, to==0)
            let y = {}
            let searchy = {}
            if(start > 0 && end > 0){
                y = {start,end}
                searchy = {
                    "filter":{
                        "category":categoryId,
                        "range":y
                    },"page":1
                }
            }else{
                y = {
                    start:0, end:0
                }
                searchy = {
                    "filter":{
                        "category":categoryId,
                        "range":null
                    },"page":1
                }
            }
            setRange({...y})
            changeSearch({...searchy})
            // console.log(selectedSearch)
        }

        let onChange =(e)=> setRange({...range, [e.target.name]:e.target.value})

        const handleCategoryChange = (valueId) =>{
            let y = {}
            let searchy = {}
            if(start > 0 && end > 0){
                y = {start,end}
                searchy = {
                    "filter":{
                        "category":valueId,
                        "range":y
                    },"page":1
                }
            }else{
                y = {
                    start:0, end:0
                }
                searchy = {
                    "filter":{
                        "category":valueId,
                        "range":null
                    },"page":1
                }
            }
            setCategory(valueId);
            setRange({...y})
            changeSearch({...searchy})
        }
    const navCategories = categories.map(element => (
        <li class="nav-item" key={element.categoryId}>
            <div className="form-check" >
                <input className="form-check-input mt-3" type="radio" name="category" onChange={() => handleCategoryChange(`${element.categoryId}`)} id="exampleRadios1" value="option1" checked ={categoryId !== element.categoryId ? false:true} />
                <label className="form-check-label mt-3" forHtml="exampleRadios1">
                    {element.categoryName}
                </label>
            </div>
        </li>
    )) 
      
    return (
        <div className='row mt-4'>
            <div className='col-2 hide-sm' >
                <div className="col-12">
                    <h6>Filter By Categories</h6>
                    <hr/>
                    <ul class="nav flex-column">
                    <li class="nav-item" key='All'>
                        <div className="form-check" >
                            <input className="form-check-input mt-3" type="radio" name="category" onChange={() => handleCategoryChange('All')} id="exampleRadios1" value="option1" checked ={categoryId !== 'All' ? false:true} />
                            <label className="form-check-label mt-3" forHtml="exampleRadios1">
                                All
                            </label>
                        </div>
                    </li>
                    {navCategories}
                    </ul>
                </div>
                <div className="col-12">
                    <h6 className="mt-3">Filter by Price Range</h6>
                    <hr/>
                    <input type="number" className="form-control mt-2" id="exampleInputEmail11" placeholder="Price From"
                    name="start" 
                    value={start}
                    onChange={onChange}
                    />
                        
                    <input type="number" className="form-control mt-2" id="exampleInputEmail1" placeholder="Price To"
                        name="end" 
                        value={end}
                        onChange={onChange}
                    />
                    <button type="button" onClick={()=>handleRangeChange()} className="btn btn-primary mt-2">Search</button>
                    
                </div>
                
            </div>
            <div className='col-10'>
                <div className='row'>
                    {products.length > 0 ? (<CartItem product={products} />) : (<Spinner/>)}
                </div>
            </div>
        </div>
    )
}
Landing.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    getAllProductsByFilter: PropTypes.func.isRequired,
    products:PropTypes.array.isRequired
};
  
const mapStateToProps = state => ({
    products: state.products.products,
    loadMore: state.products.loadMore,
});
  
export default connect(mapStateToProps, { getAllProducts, getAllProductsByFilter })(Landing);