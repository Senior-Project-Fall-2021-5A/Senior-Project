import React from 'react'

const avatarStyle = {
    verticalAlign: "middle",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}

function Message() {
    return (
        <div className="message">
            <img src="telemedicine-app\src\components\inbox components\assets\img_avatar.png" alt="Avatar" class="avatar" style={avatarStyle}></img>
        </div>
    )
}

export default Message;
