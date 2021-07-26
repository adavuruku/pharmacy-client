import React from 'react';
import muby from './muby.jpeg';
const About =()=>{

    return (
        <div className="row" style={{marginTop:'20px'}}>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={muby} className="img-fluid rounded-start" alt="Mubarak"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title">ABOUT PHARMACY E-COMMERCE SYSTEM</h6>
                            <p className="card-text"><small className="text-muted">Middlesex University Dubai</small></p>
                            <hr/>
                            <h6 className="card-title">DESIGNED BY: </h6>
                            <p className="card-text">Mubarak Ahmad.</p>
                            <p className="card-text">Department of Computer Engineering and Informatics.</p>
                            <p className="card-text">Information Technology.</p>
                            <p className="card-text">M00799139.</p>
                            <hr/>
                            <h6 className="card-title">SUPERVISED BY</h6>
                            <p className="card-text">Ms. Sumitra Kotipalli</p>
                            <p className="card-text">Dept. of Computer Engineering and Informatics</p>
                            <hr/>
                            <p className="card-text">For the Partial Fulfilment of the requirement for the Award of Bachelor of Science (BSc.) in Information Technology - Middlesex University Dubai - 2021</p>
                            <p className="card-text">Dept. of Computer Engineering and Informatics</p>
                            <p className="card-text"><small className="text-muted">Copyright &copy; 2021</small></p>
                            <hr/>
                            <h6 className="card-title">CONTACT ME</h6>
                            <p className="card-text">ahmadmubarak6996@gmail.com - +2347037954571</p>
                            <p className="card-text" style={{textAlign:'right'}}><small className="text-muted" >MUBARAK AHMAD</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default About;
// export default CartItem