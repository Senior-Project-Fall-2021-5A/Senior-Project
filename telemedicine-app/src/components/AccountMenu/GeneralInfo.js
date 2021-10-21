
import {Form, Button} from 'react-bootstrap';
import './GeneralInfo.css'
import React from 'react'



function GeneralInfo() {
    return (
        
        <Form className='general-info-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted" style={{fontSize:'25px'}}>
                    <p style={{paddingRight:"10px"}}>USER'S FIRST </p> <p>USER'S LAST</p> <h4 className= 'UserID'>User ID: ******3454</h4>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{color:'black'}}>Current e-mail address: </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{color:'black'}}>Current Phone Number: </Form.Label>
                <Form.Control type="phone" placeholder="Change Phone Number" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{color:'black'}}>Change Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label style={{color:'black'}}>Current address: </Form.Label>
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