import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import setAuthToken from '../../utils/setAuthToken'
import Spinner from 'react-bootstrap/Spinner'
import SpinnerTwo from '../layout/Spinner';


const UpdateUsers = ()=>{
      const [error, setError] = useState('')
      const [errorTable, seterrorTable] = useState('')
      const [search, setSearch] = useState('')
      const [searchResult, setsearchResult] = useState([])
      const [isSearching, setisSearching] = useState(false)
      
    
    
      const onChange = e => setSearch(e.target.value);
    
    const handleChangeRole = (itemIndex, fieldToChange)=>{
        // let items = searchResult.map(el => el.id)
        // let itemIndex = items.indexOf(userId)
        seterrorTable('')
        if(fieldToChange ==='isAdmin'){
            searchResult[itemIndex].isAdmin = !searchResult[itemIndex].isAdmin
        }else if(fieldToChange ==='isConsultant'){
            searchResult[itemIndex].isConsultant = !searchResult[itemIndex].isConsultant
        }else{
            searchResult[itemIndex].status = !searchResult[itemIndex].status
        }
        // setsearchResult([])
        setsearchResult([...searchResult])
        // console.log('na here ',searchResult)
    }


    const handleUpdate = async(itemIndex) => {
        if(itemIndex !== null){
            const config = {headers:{'Content-Type':'application/json'}}
            try {
                let selectedItem= searchResult[itemIndex]
                const body = JSON.stringify({email:selectedItem.email, userId:selectedItem.userId, status:selectedItem.status, isAdmin:selectedItem.isAdmin, isConsultant:selectedItem.isConsultant})
                setAuthToken(localStorage.token)
                const res = await axios.patch(`${baseUrl}/api/user/role/update`, body, config)
                // console.log(res.data.userInformation)
                seterrorTable(`${res.data.userInformation.firstName } ${res.data.userInformation.lastName } Role Updated !`)
            } catch (error) {
                console.log(error)
                seterrorTable('Fail To Update')
            }
        }
      };
        //update category
        const handleSeach = async() => {
            setisSearching(true)
            if(search.length <=0){
                setError('Provide Any of the user information before search')
            }else{
                const config = {headers:{'Content-Type':'application/json'}}
                try {
                    const body = JSON.stringify({search:search})
                    setAuthToken(localStorage.token)
                    const res = await axios.patch(`${baseUrl}/api/user/search`, body, config)
                    setsearchResult(res.data.userInformation)
                    // fetchCategories()
                    setError(`${res.data.userInformation.length} Users Found !`)
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
                <h6>.:. Search for users</h6>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Name / Phone / Email" aria-label="earch"
                                name="search"
                                value={search}
                                onChange={onChange}
                            />
                        </div>
                        <div className="col">
                            <button type="button" onClick={handleSeach} class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-12">
            {errorTable.length > 0 ? (<Alert>{errorTable}</Alert>):''}
                {isSearching? (<SpinnerTwo/>) : (
                    <table className="table mt-5 table-responsive">
                        
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone N<u>o</u></th>
                                <th scope="col">Email</th>
                                <th  scope="col">Admin</th>
                                <th scope="col">Consultant</th>
                                <th scope="col">Active</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchResult.map((element,i)=>(
                                    <tr className="mt-2" key={element.id}>
                                        <th scope="row">{i+1}</th>
                                        <td>{element.firstName} {element.lastName}</td>
                                        <td>{element.phone}</td>
                                        <td>{element.email}</td>
                                        <td><input className="form-check-input" onChange={()=>handleChangeRole(i, 'isAdmin')} checked={element.isAdmin} type="checkbox"  id="flexCheckDefault"/></td>
                                        <td><input className="form-check-input" onChange={()=>handleChangeRole(i, 'isConsultant')}checked={element.isConsultant} type="checkbox"  id="flexCheckDefault"/></td>
                                        <td><input className="form-check-input" onChange={()=>handleChangeRole(i, 'status')} checked={element.status} type="checkbox"  id="flexCheckDefault"/></td>
                                        <td><button type="button"  onClick = {()=>handleUpdate(i)} class="btn btn-primary"><i  className="fa fa-pencil" aria-hidden="true"></i></button></td>
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
export default UpdateUsers;
// export default CartItem