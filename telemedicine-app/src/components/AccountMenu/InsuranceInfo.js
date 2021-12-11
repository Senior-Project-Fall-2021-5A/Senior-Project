
import {Form} from 'react-bootstrap';
import './InsuranceInfo.css'
import {React, useState,useEffect} from 'react';
import  Axios  from 'axios';
import authUserObject from '../../middleware/authUserObject';



function InsuranceInfo() {
    const [insuranceInfo, setinsuranceInfo] = useState([]);

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${authUserObject.userId}`)
            .then((response) => {
                console.log("insurance info:",response);
                const myInsurance = response.data;
                setinsuranceInfo(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, []);
    return (
        
        <Form className='insurance-info-form'>
            {insuranceInfo.map((insurance) => (
            <><Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                    <p style={{ paddingRight: "10px" }}>{insurance.firstName} </p> <p>{insurance.lastName}</p> <h4 className='UserID'>Insurance Policy: {insurance.Insurance01UID}</h4>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 insurance-provider" controlId="formBasicEmail">
                <Form.Label style={{ color: 'black', fontSize: '25px', marginTop: '15%' }}>Insurance Provider: {insurance.Insurance02UID} </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ color: 'black', fontSize: "25px" }}>Insuracne Account #: {insurance.Insurance03UID} </Form.Label>
            </Form.Group>
            </>
            ))}
        </Form>
        
    
    )
}

export default InsuranceInfo