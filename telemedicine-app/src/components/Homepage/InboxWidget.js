import {React, useState,useEffect} from 'react';
import  Axios  from 'axios';
import { Card,Button} from 'react-bootstrap';
import './InboxWidget.css';
import authUserObject from '../../middleware/authUserObject';

export default function Inbox() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Axios.get(`http://telemedicine5a-backend.herokuapp.com/inbox/getInbox/${authUserObject.userId}`)
            .then((response) => {
                console.log("messages:",response);
                const myMessages = response.data;
                setMessages(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, []);
    return (
        <Card className="Inbox-Widget-Container">
            <Card.Header className='Inbox-header'>
                    <h4 className='Inbox-header-widget'>
                        INBOX
                    </h4>
            </Card.Header>
            <div className="inbox-widget-wrapper">
            {messages.map((message) => (
                <Button className='inbox-item'>
                    <div className='inbox-item'>
                        <p>&ensp;&ensp;<i className="fas fa-envelope fa-2x"> &ensp;</i></p>
                        <p>Name/emailAddress&ensp;&ensp;</p>
                        <p>{message.subject}</p>
                    </div>
                </Button>
            ))}                                     
            </div>
        </Card>
    )
}

