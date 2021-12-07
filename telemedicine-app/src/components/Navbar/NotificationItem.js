import React from 'react'
import './NotificationItem.css'

function NotificationItem() {
    let update = 'this is a message blah blah blah balfhsdjkfhkjdsh';
    let timestamp ='2020-05-24 21:27:11';
    let isRead = false;

    function isClicked(){
        isRead = true;
        console.log("isRead is: ", isRead)
    }

    return (
        <div className="notification-item" onClick= {isClicked}>
            <p className="notificaiton-message">{update}</p>
            <p className="notification-time">{timestamp}</p>
        </div>
    )
}

export default NotificationItem
