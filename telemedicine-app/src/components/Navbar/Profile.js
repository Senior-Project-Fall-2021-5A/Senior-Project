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

    //values set for the red circle button indicating everythihng is not read on the notifcation button
    let isReadRed = false;
    let readCount = userNotifications.length;
    
    //the onClick function handled when clicking on the notification Item
    function isClicked(id){
            //sets the read variable for the toast notificaiton to true
            isReadRed= true;
            //iterates the count of the read indexes down 1
            readCount--
            //performs the post function on click updating the isRead value in the DB
            updateNotification(id);
        //displays the toast as none when the count reaches 0 by clicking
        if(readCount === 0){
            document.getElementById("notificationToast").style.display="none";
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);
    //Updates the notificaiton isRead to false
    const updateNotification = (id) =>{
            Axios({
                method: 'post',
                url: `https://telemedicine5a-backend.herokuapp.com/notifs/updateNotification/${id}`,
                data: {
                  isRead: true
                }
              });
            }
    
    const getUserInfo = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${txtGlobalUserID}`)        
            .then((response) => {                
                let data = response.data;           
                console.log("response:",data[0].isAdmin);
                setBoolPortal(data[0].isAdmin);
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }
   //Gets the notificaitons
    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/notifs/getNotifications/${authUserObject.userId}`)        
            .then((response) => { 
                let notifdata = response.data;
                const result = notifdata.filter(notifdata => notifdata.isRead === false);
                setUserNotifications(result);
                //takes away the red circle if there is nothing intially in the array
                if(result.length === 0){
                    document.getElementById("notificationToast").style.display="none";
                }
            }).catch((err) => {
                console.log(err, "Unable to get notifications");
            });
    }, [userNotifications]);

    const logout = ( event ) => {
        console.log('logout',event);
        localStorage.clear();
    }

    return (
        <ButtonGroup className='nav-buttons'>
            <DropdownButton  className='profile-button' id="pro"title={<span className='profile-icon'><i class="fas fa-user-circle fa-2x"></i></span>} >
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
                {userNotifications.map((notificaitons) => (
                    <div value ={notificaitons._id} className="notification-item" id="notificaitonItem" onClick={e => isClicked(notificaitons._id)} >
                        <div className="notification-content">
                            <p className="notificaiton-message">You have a new {notificaitons.notif_type} notification!</p>
                            <p className="notification-time">{notificaitons.date_time}</p>
                        </div>
                        <div clsassName="notification-icon">
                            <i class="fas fa-exclamation fa-2x" ></i>
                        </div>
                    </div>
                ))}
            </DropdownButton>

        </ButtonGroup>

    )
}

export default Profile
