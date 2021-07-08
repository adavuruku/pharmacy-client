import React,{useEffect, forwardRef, useRef,useState, useImperativeHandle,Fragment} from 'react';
import { connect } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NumberFormat from 'react-number-format';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
// import Spinner from 'react-bootstrap/Spinner'
import Spinner from '../layout/Spinner'
import Col from 'react-bootstrap/Col';

import { saveCart  } from '../../actions/cart';
// key={product.inventoryId}
const UpdateProductForm = forwardRef(({},ref)=>{

    const localPayRef = useRef()
    const [show, setShow] = useState(false);

    const [categories, loadCategories] = useState([])
    const [imgSrc, setimgSrc] = useState(null)
    const [isSubmitting, setisSubmitting] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [isImageChange, setisImageChange] = useState(false);
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        productName: '',
        productId: '',
        productDescription: '',
        productPrice: '',
        productMeasure: '',
        productCategory: '',
        productPercent: 0,
    });


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => {
        return {
            changeShow: (element)=>{
                setFormData({...element,productCategory:element.Category.categoryId,productId:element.inventoryId})
                setimgSrc(element.productImage)
                // console.log(element)
                handleShow()
            }
        }
      });

      //this deals with the categories

      useEffect(() => {
        fetchCategories()
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

      
      
    
      const { productId, productName,productDescription,productPrice, productMeasure, productCategory, productPercent} = formData;
        const onChange = e =>{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    
       //create new product
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
            if(isImageChange){
                formDataHere.append('productImage',selectedFile)
            }
            const config = {headers:{'Content-Type':'multipart/form-data'}}
            try {
                setAuthToken(localStorage.token)
                const res = await axios.patch(`${baseUrl}/api/user/product/update`, formDataHere, config)
                setError('Succesfully Updated')
            } catch (error) {
                console.log(error)
                setError('Fail To Add Category')
            }
        }
        setisSubmitting(false)
      }

    
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        let url = URL.createObjectURL(event.target.files[0]);
        setimgSrc(url)
        setisImageChange(true)
        console.log(url,event.target.files[0])
    };

    let categos = categories.map(el=> <option key={el.categoryId} value={el.categoryId} selected = {productCategory === el.categoryId? true:false}  >{el.categoryName}</option>)

    return (
        <Fragment  >
            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={show}  onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Update Products</h5>
                    {error.length >0 && (
                    <Alert variant='danger'>
                        {error}
                    </Alert>)
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error.length > 0 ? (<Alert>{error}</Alert>):''}
                    <h6>.:. Update Product</h6>
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
                                        
                                        <option value="Pieces" selected = {productMeasure === 'Pieces'? true:false} >Pieces</option>
                                        <option value="Pack" selected = {productMeasure === 'Pack'? true:false}>Pack</option>
                                        <option value="Dozens" selected = {productMeasure === 'Dozens'? true:false} >Dozens</option>
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
                        {isSubmitting ? (<Spinner className="text-centre" animation="grow" variant="dark" />):(<Button onClick={handleProductSubmit} variant="primary mt-2 justify-content-end" >
                            Save Product
                        </Button>)}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Fragment>
        );
    })

// export default CheckOutAddAddress;
// export default UpdateProductForm;
export default ({forwardRef:true},UpdateProductForm);
// export default CartItem