import React,{useState, useRef} from 'react';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
import UpdateProductForm from './updateProductForm';
import Alert from 'react-bootstrap/Alert'
import setAuthToken from '../../utils/setAuthToken'
import Spinner from 'react-bootstrap/Spinner'
import SpinnerTwo from '../layout/Spinner';


const UpdateProduct = ()=>{
      const [error, setError] = useState('')
      const [errorTable, seterrorTable] = useState('')
      const [search, setSearch] = useState('')
      const [searchResult, setsearchResult] = useState([])
      const [isSearching, setisSearching] = useState(false)
      
      const callPayment = useRef(); //call payment dialog box in child component
    
      const onChange = e => setSearch(e.target.value);
    
    const handleDelete = async(itemIndex) => {
        if(window.confirm('Do you want to delete product?')){
            if(itemIndex !== null){
                const config = {headers:{'Content-Type':'application/json'}}
                try {
                    let selectedItem= searchResult[itemIndex].inventoryId
                    setAuthToken(localStorage.token)
                    const res = await axios.delete(`${baseUrl}/api/user/products/delete/${selectedItem}`, config)
                    // console.log(res.data.userInformation)
                    searchResult.splice(itemIndex,1)
                    // setsearchResult(searchResult => [...searchResult.filter(el=> el.inventoryId !== selectedItem.inventoryId)])
                    setsearchResult(searchResult => [...searchResult])
                    seterrorTable(`${res.data.products.productName } Deleted !`)
                } catch (error) {
                    console.log(error)
                    seterrorTable('Fail To Update')
                }
            }
        }
      };

        //update category
        const handleSearch = async() => {
            setisSearching(true)
            if(search.length <=0){
                setError('Provide Any of the user information before search')
            }else{
                const config = {headers:{'Content-Type':'application/json'}}
                try {
                    const body = JSON.stringify({search:search})
                    setAuthToken(localStorage.token)
                    const res = await axios.patch(`${baseUrl}/api/user/products/search`, body, config)
                    setsearchResult(res.data.products)
                    // fetchCategories()
                    setError(`${res.data.products.length} Products Found !`)
                } catch (error) {
                    console.log(error)
                    setError('Fail To Search Retry')
                }
            }
            setisSearching(false)
          };
   
    return (
        <div className="row bg-white p-2">
            <div className="col-12">
                {error.length > 0 ? (<Alert>{error}</Alert>):''}
                <h6>.:. Search for products</h6>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Any Part of the Product Name" aria-label="earch"
                                name="search"
                                value={search}
                                onChange={onChange}
                            />
                        </div>
                        <div className="col">
                            <button type="button" onClick={handleSearch} class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-12">
            <UpdateProductForm ref={callPayment}/>
            {errorTable.length > 0 ? (<Alert>{errorTable}</Alert>):''}
                {isSearching? (<SpinnerTwo/>) : (
                    <table className="table mt-5 table-responsive">
                        
                        <thead>
                            <tr key={'head'}>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th  scope="col">Cost</th>
                                <th scope="col">Discount(%)</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchResult.map((element,i)=>(
                                    <tr className="mt-2" key={element.inventoryId}>
                                        <th scope="row">{i+1}</th>
                                        <td><img src ={element.productImage} height="50px" width="50px"/></td>
                                        <td>{element.productName}</td>
                                        <td>{element.Category.categoryName}</td>
                                        <td>{element.productPrice}</td>
                                        <td>{element.productPercent}</td>
                                        <td><button type="button"  onClick = {()=>handleDelete(i)} class="btn btn-danger"><i  className="fa fa-trash" aria-hidden="true"></i></button></td>
                                        <td><button type="button"  onClick={()=>callPayment.current.changeShow(element)} class="btn btn-primary"><i  className="fa fa-pencil" aria-hidden="true"></i></button></td>
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        );
    }
  
// export default CheckOutAddAddress;
export default UpdateProduct;
// export default CartItem