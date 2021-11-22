
import {Form, Button} from 'react-bootstrap';
import './GeneralInfo.css'
import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { UserComponentFactory } from 'ag-grid-community';



function GeneralInfo() {
    const post = {
        firstName: "Steven",
        lastName: "Wallace",
        email: "stevenjr@yahoo.com",
        phone: "229-394-1967",
        address: "497 Lockheed Way, Marietta, GA 30060",
        userID: "*****3946"
    }

    
    const [firstName,setfirstName] = React.useState(post.firstName);
    const [email,setEmail] = React.useState(post.email);
    const [lastName,setlastName] = React.useState(post.lastName);
    const [phone,setPhone] = React.useState(post.phone);
    const [address,setAddress] = React.useState(post.address);
    const [userID,setuserID] = React.useState(post.userID);

    React.useEffect(() => 
    {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/account/getAccount')
            .then(response => 
            {
                setfirstName(response.data.firstName);
                setEmail(response.data.email);
                setlastName(response.data.lastName);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setuserID(response.data.userID);
            });
    },[]);
    return (
        <Form className='general-info-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted" style={{fontSize:'25px'}}>
                    <p style={{paddingRight:"10px"}}>{post.firstName} </p> <p>{post.lastName}</p> <h4 className= 'UserID'>User ID: {[post.userID]}</h4>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{color:'black'}}>Current e-mail address: {post.email}</Form.Label>
                <Form.Control type="email" placeholder="Email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{color:'black'}}>Current Phone Number: {post.phone}</Form.Label>
                <Form.Control type="phone" placeholder="Change Phone Number" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{color:'black'}}>Change Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label style={{color:'black'}}>Current address: {post.address}</Form.Label>
                <Form.Control type="address1" placeholder="Address 1" />
                <Form.Control type="address2" placeholder="Address 2" />
                <Form.Control type="city" placeholder="City" />
                <Form.Control type="state" placeholder="State" />
                <Form.Control type="zip" placeholder="Zip" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
        
    
    )
}

export default GeneralInfo