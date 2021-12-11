import React from 'react'
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './login.css';
import Logo from '../../images/company-logo.png';
import Axios from 'axios';

function Login() {

  let userId = '';
  let userRole = 0;
  let isAuth = false;
  const history = useHistory();
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  })

  const handleLoginClick = () => {
    Axios.post('https://telemedicine5a-backend.herokuapp.com/auth/login', {
      email: loginState.email,
      password: loginState.password
    }).then((response) => {
        userId = String(response.data.user._id);
        userRole = String(response.data.user.role);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', userRole);        
        localStorage.setItem('boolIsLogged', "true");      
        isAuth = true;        
        authReroute(isAuth);
    }).catch((err => {
        isAuth = false;
        authReroute(isAuth);
        console.log(err)
    }))
  };

  const authReroute = (isAuth) => {
    if(isAuth === true){
      history.push('/loginloading');
      window.location.reload(false);      
    } else {
      alert("Invalid credentials, ensure your login info is correct!");
    } 
  }

  const handleChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = () => {
    handleLoginClick();
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
                <Form.Control type="text" name='email'
                  value={loginState.email}
                  onChange={handleChange}
                  placeholder="Enter email" 
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name='password'
                  value={loginState.password}
                  onChange={handleChange} 
                  placeholder="Password" 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <span onClick={handleClick} className='registericon'>
                <Button className='login-register-btn'>
                  Login
                </Button>{' '}
              </span>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  