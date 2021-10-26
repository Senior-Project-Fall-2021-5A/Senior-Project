
import {Form, Button} from 'react-bootstrap';
import './InsuranceInfo.css'
import React from 'react'



function InsuranceInfo() {
    return (
        
        <Form className='insurance-info-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted" style={{fontSize:'25px'}}>
                    <p style={{paddingRight:"10px"}}>USER'S FIRST </p> <p>USER'S LAST</p> <h4 className= 'UserID'>Insurance Policy: ******3454</h4>
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
            
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
        
    
    )
}

export default InsuranceInfo