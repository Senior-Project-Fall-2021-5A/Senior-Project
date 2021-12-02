import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import {Badge, Button, DropdownButton, ButtonGroup,Dropdown} from 'react-bootstrap';
import authUserObject from '../../middleware/authUserObject';

function Profile() {
    const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
    const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
    const [boolPortal, setBoolPortal] = useState(false);

    useEffect(() => {
        console.log("Page Open: ",txtGlobalUserID, " Role: ",txtGlobalRole);
        getUserInfo();
    }, []);

    const getUserInfo = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${txtGlobalUserID}`)        
            .then((response) => {                
                let data = response.data;           
                console.log("response:",data);
                setBoolPortal(data[0].isAdmin);
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    return (
        <ButtonGroup className='nav-buttons'>
            <DropdownButton  className='profile-button' title={<span className='profile-icon'><i class="fas fa-user-circle fa-2x"></i></span>} >
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1" href='/myaccount'>My Account</Dropdown.Item>
                <Dropdown.Item eventKey="2" href='/appointments'>My Appointments</Dropdown.Item>
                <Dropdown.Item eventKey="3" href='/reports'>My Reports</Dropdown.Item>
                <Dropdown.Item eventKey="4" href='/inbox'>My Inbox</Dropdown.Item>
                <Dropdown.Item eventKey="5" href= '/'>Logout</Dropdown.Item>
                {boolPortal && <Dropdown.Item eventKey="6" href= '/adminPortal'>Portal</Dropdown.Item> } 
            </DropdownButton>
            <DropdownButton className="notification-button" title={<span className='notification-icon'><Badge bg="danger">3</Badge><i class="fas fa-inbox"></i></span>}>
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1">Appointment: Dr. Hayward</Dropdown.Item>
                <Dropdown.Item eventKey="2">Docort Notes: Dr. Hayward</Dropdown.Item>
                <Dropdown.Item eventKey="3">Lab Results: Bortolazzo Group</Dropdown.Item>
            </DropdownButton>
        </ButtonGroup>

    )
}

export default Profile
