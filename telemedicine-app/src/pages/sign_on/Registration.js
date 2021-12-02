import React, { useContext } from 'react';
import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './Registration.css';
import Logo from '../../images/company-logo.png';
import Axios from 'axios';

function Registration() {

  let userId = '';
  let userRole = 0;
  let isAuth = false;
  let isAdmin = false;
  const history = useHistory();
  const [registerState, setRegisterState] = useState({
    fName: '',
    lName: '',
    name: '',
    email: '',
    password: '',
  })

  const handleRegisterClick = () => {
    try {
      console.log(registerState)
      // Create user with email and password
      Axios.post('https://telemedicine5a-backend.herokuapp.com/users/register', {
        name: registerState.fName + ' ' + registerState.lName,
        email: registerState.email,
        password: registerState.password,
        }).then((response) => {
            userId = String(response.data.user._id);
            userRole = String(response.data.user.role);
            userRole === 0 ? isAdmin = true : isAdmin = false;
            console.log(userId, userRole);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', userRole);
            // Create user profile with first/last name and email
            return Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/createUserProfile/${response.data.user._id}`, {
              firstName: registerState.fName,
              midName: '',
              lastName: registerState.lName,
              email: registerState.email,
              userUID: userId,
              DoB: '',
              gender: '',
              address1: '',
              address2: '',
              city: '',
              state: '',
              zip: '',
              phone1: '',
              phone2: '',
              phone3: '',
              Insurance01UID: '',
              Insurance02UID: '',
              Insurance03UID: '',
              primaryPhysician: '',
              approvedDoctors: [''],
              isAdmin: isAdmin,
            });
          }).then((response) => {
              isAuth = true;
              authReroute(isAuth);
          }).catch((err) => {
              console.log(err)
        });  
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = e => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    })
  }

  const authReroute = (isAuth) => {
    isAuth === true ? history.push('/loginloading') :
      alert("Invalid user registration! Account may already exist, validate if your email is correct");
  }

  const handleClick = () => {
    handleRegisterClick();
  }
    return (
      <div className="login-page" style={{background:"linear-gradient(90deg, rgb(110,94, 254) 60%, rgb(73, 63, 252, 1) 100%)"}}>
        <div className= 'Registration-container'>
            <Link className='Registration-back-button' to ='/'>
            <Button className='back-button' style={{borderRadius:'50px'}}>
                <i class="fas fa-chevron-circle-left fa-3x"></i>
            </Button>
            </Link>
          <div className='Registration card'>
            <div className='company-logo'>
                <i class="fab fa-wpforms fa-10x"></i>
            </div>
            <Form className = 'Registration-Form'>
              <Form.Group className="Register-first" controlId="formBasicFirstRegister">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name='fName'
                  value={registerState.fName}
                  onChange={handleChange}
                  placeholder="Enter Your First Name" 
                />
              </Form.Group>

              <Form.Group className="Register-last" controlId="formBasicLastRegister">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lName'
                  value={registerState.lName}
                  onChange={handleChange}
                  placeholder="Enter Your Last Name" 
                />
              </Form.Group>

              <Form.Group className="Register-email" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='email'
                  value={registerState.email}
                  onChange={handleChange}
                  placeholder="Enter email" 
                />
              </Form.Group>

              <Form.Group className="Register-password" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name='password'
                  value={registerState.password}
                  onChange={handleChange} 
                  placeholder="Password" 
                />
              </Form.Group>
              <span onClick={handleClick} className='registericon'>
                <Button className='login-register-btn'>
                  Submit
                </Button>{' '}
              </span>
            </Form>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default Registration;