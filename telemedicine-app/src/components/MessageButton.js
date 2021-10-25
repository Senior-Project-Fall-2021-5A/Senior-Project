import React from 'react';
import './MessageButton.css'
import {Button} from 'react-bootstrap'

function MessageButton() {
    return (
        <Button className='message-button' style={{bottom: '11%', borderRadius:'50px'}}>
            <i class="fas fa-comments fa-2x"></i>
        </Button>
    )
}

export default MessageButton;
