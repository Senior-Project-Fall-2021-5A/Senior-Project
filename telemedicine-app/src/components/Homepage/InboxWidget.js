import {React, useState,useEffect} from 'react';
import  Axios  from 'axios';
import { Card,Button} from 'react-bootstrap';
import './InboxWidget.css';
import authUserObject from '../../middleware/authUserObject';

export default function Inbox() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/inbox/getMessages/${authUserObject.userId}`)
            .then((response) => {
                console.log("messages:",response);
                const myMessages = response.data;
                setMessages(response.data);
                setTheNames(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, []);

    const setTheNames = (arrMessage) => {
        let newList = [];
        arrMessage.forEach(e => {
            let id = e.senderID;
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {
                    let data = response.data;
                    console.log("setTheNames() - response:", data);

                    let name = data[0].lastName + ", " + data[0].firstName;
                    console.log("setTheNames() - name:", name);

                    e.senderName = name;
                    console.log("setTheNames() - e.senderName:", e.senderName);

                    console.log("setTheNames() - arrMessage: ", arrMessage);
                    newList = [...newList, e];

                    setMessages(newList);

                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
        });




    }
    return (
        <Card className="Inbox-Widget-Container">
            <Card.Header className='Inbox-header'>
                    <h4 className='Inbox-header-widget'>
                        INBOX
                    </h4>
            </Card.Header>
            <div className="inbox-widget-wrapper">
            {messages.map((message) => (
                <Button href ="/inbox" className='inbox-item'>
                    <div className='inbox-item'>
                        <p>&ensp;&ensp;<i className="fas fa-envelope fa-2x"> &ensp;</i></p>
                        <p>{message.senderName}&ensp;&ensp;</p>
                        <p>{message.subject}</p>
                    </div>
                </Button>
            ))}                                     
            </div>
        </Card>
    )
}

