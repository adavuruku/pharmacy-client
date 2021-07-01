import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import setAuthToken from '../../utils/setAuthToken'

const AddProduct = ()=>{
      const [error, setError] = useState('')
      const [categories, loadCategories] = useState([])
      const [imgSrc, setimgSrc] = useState(null)
      const [isSubmitting, setisSubmitting] = useState(false)
      const [selectedFile, setSelectedFile] = useState(null);
      const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productMeasure: '',
        productCategory: '',
        productPercent: 0,
      });

      
    
      const { productName,productDescription,productPrice, productMeasure, productCategory, productPercent} = formData;
    
      const onChange = e =>{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        const changeHandler = (event) => {
            setSelectedFile(event.target.files[0]);
            // let reader = new FileReader();
            // let url = reader.readAsDataURL(event.target.files[0]);
            let url = URL.createObjectURL(event.target.files[0]);
            setimgSrc(url)
            console.log(url,event.target.files[0])
        };

    //create new category
      const handleProductSubmit = async() => {
        setisSubmitting(true)
        if(productName.length <=0 || productDescription.length <=0 ||productPrice.length <=0||productMeasure.length <=0||productCategory.length <=0 ||  productPercent < 0 || imgSrc.length <=0){
            setError('Provide All the needed Information')
        }else{
            const formDataHere = new FormData();
            // Object.keys(object).forEach(key => formData.append(key, object[key]));
            for ( var key in formData ) {
                formDataHere.append(key, formData[key]);
            }
            formDataHere.append('productImage',selectedFile)
            // console.log(formDataHere)
            const config = {headers:{'Content-Type':'multipart/form-data'}}
            try {
                setAuthToken(localStorage.token)
                const res = await axios.post(`${baseUrl}/api/user/product/add`, formDataHere, config)
                setError('Created Succesfully')
            } catch (error) {
                console.log(error)
                setError('Fail To Add Category')
            }
        }
        setisSubmitting(false)
      };
      useEffect(() => {
        fetchCategories()
        // console.log('in fetch')
      }, [])
      //loading categories
      const fetchCategories = async (categoryName) => {
        const config = {headers:{'Content-Type':'application/json'}}
        try {
            const body = JSON.stringify({categoryName})
            setAuthToken(localStorage.token)
            const res = await axios.get(`${baseUrl}/api/user/category/all/1`, config)
            let catego = [...res.data.categories]
            loadCategories(catego)
        } catch (error) {
          console.log(error)
        }
      };

      
      //load options for select categpries
    let categos = categories.map(el=> <option key={el.categoryId} value={el.categoryId} >{el.categoryName}</option>)
    return (
        <div className="row bg-white p-2">
            <div className="col-7">
                    {error.length > 0 ? (<Alert>{error}</Alert>):''}
                    <h6>.:. Create Product</h6>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Row className="mb-2" >
                            <img src={imgSrc} style={{height:'20rem', width:'20rem'}} className="img-thumbnail" width="100%" />
                            <Form.Group>
                            <Form.Label className="mt-2">Product Image</Form.Label>
                                <Form.File  onChange={changeHandler} id="exampleFormControlFile1"  />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exampleForm.ControlInput10">
                                <Form.Label className="mt-2">Product Name</Form.Label>
                                <Form.Control type="text" 
                                name="productName" onFocus={()=>setError('')} placeholder="Product Name"
                                value={productName}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group as={Col}  controlId="exampleForm.SelectCustomSizeLg">
                                <Form.Label className="mt-2" >Select Catgory</Form.Label>
                                <Form.Control onFocus={()=>setError('')}  value={productCategory} as="select" className="form-select" name="productCategory" 
                                onChange={onChange}
                                custom>
                                    {categos}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}  controlId="validationFormik101">
                                <Form.Label onFocus={()=>setError('')} className="mt-2" >Product Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="productPrice"
                                    value={productPrice}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}  controlId="validationFormik101u">
                                <Form.Label className="mt-2" >Discount Percent</Form.Label>
                                <Form.Control
                                    onFocus={()=>setError('')}
                                    type="number"
                                    name="productPercent"
                                    value={productPercent}
                                    onChange={onChange}
                                />
                            </Form.Group>
                          <Form.Group as={Col}  controlId="validationFormik102">
                                <Form.Label className="mt-2" >Product Measure</Form.Label>
                                <Form.Control className="form-select" as="select" name="productMeasure"
                                    value={productMeasure}  
                                    onChange={onChange}
                                    onFocus={()=>setError('')}
                                    >
                                        <option value="Pack" >Pack</option>
                                        <option value="Pieces" >Pieces</option>
                                        <option value="Dozens" >Dozens</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="mt-2">Product Description</Form.Label>
                                <Form.Control onFocus={()=>setError('')} as="textarea" rows={3} 
                                name="productDescription"
                                value={productDescription}
                                onChange={onChange}
                                required/>
                            </Form.Group>
                        </Form.Row>
                        {isSubmitting ? (<Spinner className="text-centre" animation="grow" variant="dark" />):(<Button onClick={handleProductSubmit} variant="primary mt-2" >
                            Save Product
                        </Button>)}
                    </Form>
            </div>
        </div>
        );
    }
  
// export default CheckOutAddAddress;
export default AddProduct;
// export default CartItem