
import {Form, Button} from 'react-bootstrap';
import './GeneralInfo.css'
import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import authUserObject from '../../middleware/authUserObject';



function GeneralInfo() {

    let userEmail = '';
    let userPhone = '';
    let userPassword = '';
    let userAddress1 = '';
    let userAddress2 = '';
    let userCity = '';
    let userState = '';
    let userZip = '';
    const [generalInfo, setgeneralInfo] = useState([]);
    const [registerUserState, setRegisterUserState] = useState({
        email: '',
        phone1: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      })
    
    const handleChange = e => {
        setRegisterUserState({
          ...registerUserState,
          [e.target.name]: e.target.value,
        })
      }

    const handleClick = () => {
        handleUserRegisterClick();
    }

    useEffect(() => {
        Axios.get(`http://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${authUserObject.userId}`)
            .then((response) => {
                console.log("last report:",response);
                const myInfo = response.data;
                setgeneralInfo(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get uder infor");
            });
    }, []);

    const handleUserRegisterClick = () => {
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/updateUserInfo/${authUserObject.userId}`, {
            email: registerUserState.email,
            }).then((response) => {
                userEmail = String(response.data.user.email);
                console.log(userEmail);
                localStorage.setItem('userEmail');

                userPhone = String(response.data.user.phone1);
                console.log(userPhone);
                localStorage.setItem('userPhone');

                userPassword = String(response.data.user.password);
                console.log(userPassword);
                localStorage.setItem('userPassword');

                userAddress1 = String(response.data.user.address1);
                console.log(userAddress1);
                localStorage.setItem('userAddress1');

                userAddress2 = String(response.data.user.address2);
                console.log(userAddress2);
                localStorage.setItem('userAddress2');

                userCity = String(response.data.user.city);
                console.log(userCity);
                localStorage.setItem('userCity');

                userState = String(response.data.user.state);
                console.log(userState);
                localStorage.setItem('userState');
                
                userZip = String(response.data.user.zip);
                console.log(userZip);
                localStorage.setItem('userZip');
            }
             )};


    

    return (
        <Form className='general-info-form'>
            {generalInfo.map((info) => (
            <><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px" }}>{info.firstName} </p> <p style={{paddingRight:"10px"}}>{info.midName}</p> <p>{info.lastName}</p> <h4 className='UserID'>User ID: {info.userUID}</h4>
                    </Form.Text>
                    <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px" }}>Date of Birth: {info.DoB} </p> 
                    </Form.Text>
                    <Form.Text className="text-muted" style={{ display:"flex",fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px"}}>Gender: {info.gender} </p> 
                    </Form.Text>
                </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'black' }}>Current e-mail address: {info.email}</Form.Label>
                        <Form.Control name = "email" type="text" placeholder="Email" value={registerUserState.email} onChange={handleChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black' }}>Current Phone Number: {info.phone1}</Form.Label>
                        <Form.Control name ="phone1"  value={registerUserState.phone1} onChange={handleChange} type="text" placeholder="Change Phone Number" />
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black' }}>Change Password</Form.Label> {info.password}
                        <Form.Control name= "password" value={registerUserState.password} onChange={handleChange} type="text" placeholder="Password" />
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label style={{ color: 'black' }}>Current address: {info.address1} {info.address2} {info.city} , {info.state} {info.zip}</Form.Label>
                        <Form.Control name="address1" value={registerUserState.address1} onChange={handleChange} type="text" placeholder="Address 1" />
                        <Form.Control name="address2" value={registerUserState.address2} onChange={handleChange} type="text" placeholder="Address 2" />
                        <Form.Control name="city" value={registerUserState.city} onChange={handleChange} type="text" placeholder="City" />
                        <Form.Control name="state" value={registerUserState.state} onChange={handleChange} type="text" placeholder="State" />
                        <Form.Control name="zip" value={registerUserState.zip} onChange={handleChange} type="text" placeholder="Zip" />
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group><Button variant="primary" type="submit" onClick={handleClick}>
                        Save
                    </Button></>
            ))}
        </Form>
    
    )
}

export default GeneralInfo