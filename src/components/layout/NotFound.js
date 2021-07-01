import React from 'react';
import { Link } from 'react-router-dom';
 //an npm package to validate the prop types send to this component

const NotFound = () => {

    const mystyle = {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    };

   
  return (
    <div class="row justify-content-centre" style={mystyle}>
        <div className="card text-center" style={{width: '20rem', height: '20rem'}}>
            <div className="card-body">
                <h1><i className="fa fa-ban" style={{fontSize: '5rem', color: 'blue'}}></i></h1>
                <h5 className="card-title"><strong>Ooops !!!.</strong></h5>
                <p className="text-mute">The resource you are looking for is not available.</p>
                <Link to="/home" className="btn btn-primary">View Products</Link>
            </div>
        </div>
    </div>
  )
};


  
// export default CheckOutAddAddress;
export default NotFound;
