import React from 'react'
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import './login.css';
import Logo from '../images/company-logo.png';


function Login() {

  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleRegisterClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  const handleClick = () => {
    handleRegisterClick();
  }
    return (
      <div className="login-page" style={{background:"linear-gradient(90deg, rgb(110,94, 254) 60%, rgb(73, 63, 252, 1) 100%)"}}>
        <div className= 'Login-container'>
          <div className='Login card'>
            <div className='company-logo'>
              <img src ={Logo} alt='logo'/>
            </div>
            <Form className = 'Login-Form'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Link to='/loginloading'>
                <Button className='login-submit-button' type="submit">
                    Login
                </Button>
              </Link>
              <Link to ='/registration' className='registericon'>
                <Button className='login-register-btn'>
                  Register
                </Button>{' '}
              </Link>
            </Form>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  