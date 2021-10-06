import {Form, Button} from 'react-bootstrap';
import './GeneralInfo.css'
import React from 'react'



function GeneralInfo() {
    return (
        <Form className='general-info-form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted" style={{fontSize:'25px'}}>
                    USER'S NAME
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
                <Form.Label style={{color:'black'}}>Change Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
