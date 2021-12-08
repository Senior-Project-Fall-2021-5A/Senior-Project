import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import {Badge, Button, DropdownButton, ButtonGroup,Dropdown} from 'react-bootstrap';
import authUserObject from '../../middleware/authUserObject';
import './NotificationItem.css'
import NotificationItem from "./NotificationItem";

function Profile() {
    const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
    const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
    const [boolPortal, setBoolPortal] = useState(false);
    const [userNotifications, setUserNotifications] = useState([]);
    const [notifUID, setnotifUID] = React.useState("");


    let isRead = false;
    let readCount = userNotifications.length;
    
    
    function isClicked(){

            isRead = true;
            readCount--
            console.log("isRead is: ", isRead)
            console.log("This is readCount: ", readCount);
            updateNotification();
        if(readCount === 0){
            document.getElementById("notificationToast").style.display="none";
        }
    }

    useEffect(() => {
        console.log("Page Open: ",txtGlobalUserID, " Role: ",txtGlobalRole);
        getUserInfo();
    }, []);

    const onNotificaitonSelect = (event) => {
        //console.log("onDoctorSelect - ", event);
        //console.log("Value set: ", event.target.value);
        setnotifUID(event.target.value);
    }
    
    const updateNotification = () =>{
            Axios({
                method: 'post',
                url: `https://telemedicine5a-backend.herokuapp.com/notifs/updateNotification/${userNotifications._id}`,
                data: {
                  isRead: true
                }
              });
              console.log("is read post: ", isRead)
            }
    
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

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/notifs/getNotifications/${authUserObject.userId}`)        
            .then((response) => { 
                console.log("here are your notifications:",response.data);
                setUserNotifications(response.data);
            }).catch((err) => {
                console.log(err, "Unable to get notifications");
            });
    }, []);

    function gettingnotificationID(notificationID) {

        // var self = this;
        // var title;
      
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/notifs/getNotifications/${authUserObject.userId}`+notificationID)
        .then(response => {
          this.notifID = response.data._id
          console.log(response.data._id) //returns the correct title
        })
        // return title // not needed
      
      }

    

    const logout = ( event ) => {
        console.log('logout',event);
        localStorage.clear();
    }

    return (
        <ButtonGroup className='nav-buttons'>
            <DropdownButton  className='profile-button' id="pro"title={<span className='profile-icon'><i class="fas fa-user-circle fa-2x"></i></span>} >
                <span className="visually-hidden">unread messages</span>
                <Dropdown.Item eventKey="1" href='/myaccount'>My Account</Dropdown.Item>
                <Dropdown.Item eventKey="2" href='/NoAppointments'>My Appointments</Dropdown.Item>
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
                {userNotifications.map((notificaitons) => (
                    <div onChange={e => onNotificaitonSelect(e)} value ={notificaitons._id}className={notificaitons._id} id="notificaitonItem" onClick={isClicked} >
                        <p className="notificaiton-message">You have a new {notificaitons.notif_type} notification!</p>
                        <p className="notification-time">{notificaitons.date_time}</p>
                    </div>
                ))}
            </DropdownButton>

        </ButtonGroup>

    )
}

export default Profile
