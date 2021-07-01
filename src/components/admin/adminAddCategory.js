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

const AdminAddCategory = ()=>{
      const [error, setError] = useState('')
      const [errorUpdate, seterrorUpdate] = useState('')
      const [categories, loadCategories] = useState([])
      const [isSubmittingNew, setisSubmittingNew] = useState(false)
      const [isSubmittingUpd, setisSubmittingUpd] = useState(false)
      const [formData, setFormData] = useState({
        categoryName: '',
        categoryUpdateName: '',
        categoryUpdateId: '',
      });
    
      const { categoryName,categoryUpdateName,categoryUpdateId } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
        //set update form once category is clicked
        const selectACategory = (categoryUpdateId, categoryUpdateName) => {
            setFormData({ ...formData, categoryUpdateId:categoryUpdateId, categoryUpdateName:categoryUpdateName })
        }
    
        //update category
        const handleCategoryUpdate = async() => {
            setisSubmittingUpd(true)
            if(categoryUpdateId.length <=0 || categoryUpdateName.length <=0 ){
                setError('Select A category from the list')
            }else{
                const config = {headers:{'Content-Type':'application/json'}}
                try {
                    const body = JSON.stringify({categoryId:categoryUpdateId, categoryName:categoryUpdateName})
                    setAuthToken(localStorage.token)
                    const res = await axios.patch(`${baseUrl}/api/user/category/update`, body, config)
                    fetchCategories()
                    seterrorUpdate('Update Succesfully')
                } catch (error) {
                console.log(error)
                seterrorUpdate('Fail To Update Category')
                }
            }
            setisSubmittingUpd(false)

          };
    
    //create new category
      const handleCategorySubmit = async() => {
          setisSubmittingNew(true)
        if(categoryName.length <=0){
            setError('Provide A Valid Category Name')
        }else{
            const config = {headers:{'Content-Type':'application/json'}}
            try {
                const body = JSON.stringify({categoryName})
                setAuthToken(localStorage.token)
                const res = await axios.post(`${baseUrl}/api/user/product/category/add`, body, config)
                let newCategory = {
                    categoryName: res.data.category.categoryName,
                    categoryId: res.data.category.categoryId
                }
                let catego = [...categories, newCategory]
                loadCategories(catego)
                setFormData({ ...formData, categoryName:''})
                setError('Created Succesfully')
            } catch (error) {
            console.log(error)
            setError('Fail To Add Category')
            }
        }
        setisSubmittingNew(false)
      };
      useEffect(() => {
        fetchCategories()
      }, [])
      //loading categories
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

      let categos = categories.map(el=> <ListGroup.Item as="li" key={el.categoryId} onClick= {()=> selectACategory(el.categoryId, el.categoryName)}>{el.categoryName}</ListGroup.Item>)
    return (
        <div className="row bg-white p-2">
            <div className="col-7">
                <div className="col-12">
                    {errorUpdate.length > 0 ? (<Alert>{errorUpdate}</Alert>):''}
                    <h6>.:. Update Category</h6>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Row className="mb-2" >
                            <Form.Group as={Col} controlId="exampleForm.ControlInput10">
                                <Form.Label>Categorry Id</Form.Label>
                                <Form.Control type="text" className="form-control-plaintext p-2"
                                name="categoryUpdateId" onFocus={()=>seterrorUpdate('')}
                                value={categoryUpdateId} placeholder="Category Id"
                                onChange={onChange}
                                readonly disabled
                                />
                                <Form.Label className="mt-2">Categorry Name</Form.Label>
                                <Form.Control type="text" 
                                name="categoryUpdateName" onFocus={()=>seterrorUpdate('')} placeholder="Category Name"
                                value={categoryUpdateName}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            {isSubmittingUpd ? (<Spinner className="text-centre" animation="grow" variant="dark" />):(<Button onClick={handleCategoryUpdate} variant="primary mt-2" >
                                Update Category
                            </Button>)}
                            
                        </Form.Row >
                    </Form>
                </div>
                <div className="col-12 mt-4">
                    <hr/>
                    {error.length > 0 ? (<Alert>{error}</Alert>):''}
                    <h6>.:. Add New Category</h6>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Row className="mb-2" >
                            <Form.Group as={Col} controlId="exampleForm.ControlInput10">
                                <Form.Label>Categorry Name </Form.Label>
                                <Form.Control type="text" 
                                name="categoryName" onFocus={()=>setError('')} placeholder="Category Name"
                                value={categoryName}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            {isSubmittingNew ? (<Spinner className="text-centre" animation="grow" variant="dark" />):(<Button onClick={handleCategorySubmit} variant="primary mt-2" >
                                Save Category
                            </Button>)}
                        </Form.Row >
                    </Form>
                </div>
                
            
            </div>
            <div className="col-5">
                {categories.length <= 0 ? (<SpinnerTwo/>):(
                    <ListGroup  as="ul">
                        {categos}
                    </ListGroup>
                ) }
            </div>
        </div>
        );
    }
  
// export default CheckOutAddAddress;
export default AdminAddCategory;
// export default CartItem