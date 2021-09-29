import React from "react";
import './Profile.css';
import {Badge, Button, DropdownButton, ButtonGroup,Dropdown} from 'react-bootstrap'

function Profile() {
    return (
        <ButtonGroup className='nav-buttons'>
            <DropdownButton  className='profile-button' title={<span className='profile-icon'><i class="fas fa-user-circle fa-2x"></i></span>} >
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1">My Account</Dropdown.Item>
                <Dropdown.Item eventKey="2">My Appointments</Dropdown.Item>
                <Dropdown.Item eventKey="3">My Reports</Dropdown.Item>
                <Dropdown.Item eventKey="4">My Inbox</Dropdown.Item>
                <Dropdown.Item eventKey="5" href= '/'>Logout</Dropdown.Item>
            </DropdownButton>
            <DropdownButton className="notification-button" title={<span className='notification-icon'><Badge bg="danger">9</Badge><i class="fas fa-inbox"></i></span>}>
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
        </ButtonGroup>

    )
}

export default Profile
