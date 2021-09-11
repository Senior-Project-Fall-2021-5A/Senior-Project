import React from "react";
import './Profile.css';
import {Badge, Button} from 'react-bootstrap'

function Profile() {
    return (
        <div className='nav-buttons'>
            <Button className='profile-button'>
                <i class="fas fa-user-circle fa-2x"></i>
                <span className="visually-hidden">unread messages</span>
            </Button>
            <Button className="notification-button">
                <Badge bg="danger">9</Badge>
                <i class="fas fa-inbox"></i>
                <span className="visually-hidden">unread messages</span>
            </Button>
        </div>

    )
}

export default Profile
