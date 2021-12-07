import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Canvas.css';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import authUserObject from '../middleware/authUserObject';

const Canvas = ( props ) => {
    const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
    const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
    const [txtName, setName] = useState("");


    
    useEffect(() => {
        //console.log("Page Open - UserID: ",txtGlobalUserID, " role: ",txtGlobalRole);
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${txtGlobalUserID}`)////${txtGlobalUserID}
            .then((response) => {
                //console.log("reports:",response);
                let lName = response.data[0].firstName+" "+response.data[0].lastName;
                //console.log("What's my Name? ", lName)
                setName(lName);
            })
            .catch((err) => {
                console.log(err, "Unable to get Name");
            });
    }, []);

    return (
        <div>
            <Navbar/>
            
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'> 
                        <div className='canvas'>
                            <p
                                style={{
                                    display: 'inherit',
                                    textAlign: 'end',
                                    fontWeight: 'bold',
                                    fontSize: '17px',
                                }}
                            >Welcome {txtName}!</p>
                            
                            <div className='canvas-container'>
                                { props.children }
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>            
        </div>
    )
}

export default Canvas;
