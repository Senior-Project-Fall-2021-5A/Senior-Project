import React from 'react'
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import './Registration.css';
import Logo from '../images/company-logo.png';




function Registration() {

  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleRegisterClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

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
                <Form.Control type="text" placeholder="Enter Your First Name" />
              </Form.Group>

              <Form.Group className="Register-last" controlId="formBasicLastRegister">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" />
              </Form.Group>

              <Form.Group className="Register-email" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="Register-password" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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