import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import {Badge, Button, DropdownButton, ButtonGroup,Dropdown} from 'react-bootstrap';
import authUserObject from '../../middleware/authUserObject';
import './NotificationItem.css'
import NotificationItem from "./NotificationItem";
import {notificationData} from './notificaitonData'

function Profile() {
    const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
    const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
    const [boolPortal, setBoolPortal] = useState(false);


    let isRead = false;
    let readCount = notificationData.length;
    
    
    function isClicked(){

            isRead = true;
            readCount--
            console.log("isRead is: ", isRead)
            console.log("This is readCount: ", readCount);
        if(readCount === 0){
            document.getElementById("notificationToast").style.display="none";
        }
    }

  
    
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

    const logout = ( event ) => {
        console.log('logout',event);
        localStorage.clear();
    }

    return (
        <ButtonGroup className='nav-buttons'>
            <DropdownButton  className='profile-button' title={<span className='profile-icon'><i class="fas fa-user-circle fa-2x"></i></span>} >
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1" href='/myaccount'>My Account</Dropdown.Item>
                <Dropdown.Item eventKey="2" href='/appointments'>My Appointments</Dropdown.Item>
                <Dropdown.Item eventKey="3" href='/reports'>My Reports</Dropdown.Item>
                <Dropdown.Item eventKey="4" href='/inbox'>My Inbox</Dropdown.Item>
                {boolPortal && <Dropdown.Item eventKey="5" href= '/adminPortal'>Portal</Dropdown.Item>} 
                <Dropdown.Item 
                    eventKey="6"
                    href= '/'
                    onClick={e=>logout(e)}
                >Logout</Dropdown.Item>
            </DropdownButton>

            <DropdownButton  className='notification-btn' title={<span className='profile-icon'><i class="fas fa-inbox fa-2x"></i><Badge id="notificationToast" className = "notification-toast" bg="danger"> </Badge></span>}>
                <span className="visually-hidden">unread messages</span>
                {notificationData.map((data, index) => {
                    return (
                        <li classname='nav-list'key={index}>
                            <div className="notification-item" onClick={isClicked} >
                                <p className="notificaiton-message">{data.update}</p>
                                <p className="notification-time">{data.timestamp}</p>
                            </div>
                        </li>
                    )
                })}
            </DropdownButton>

        </ButtonGroup>

    )
}

export default Profile
