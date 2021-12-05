import React from 'react'
import { UseState, useEffect } from 'react';
import Axios from 'axios';
import "./inbox.css";
import Navbar from '../../components/Navbar/Navbar';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas.css';
import Footer from '../../components/Footer/Footer';
import Top from "../../components/inbox components/Top"
import InboxAccordion from '../../components/inbox components/InboxAccordion'
import { Link } from 'react-router-dom';
import Canvas from '../../components/Canvas'
import authUserObject from '../../middleware/authUserObject';






const Inbox = () => {

    const [listOfMessages, setMessages] = React.useState([]);





    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {

        Axios.get(`https://telemedicine5a-backend.herokuapp.com/inbox/getMessages/${authUserObject.userId}`)////${txtGlobalUserID}
            .then((response) => {
                console.log("Response Data: ", response.data);
                // setMessages(response.data);
                setMessages(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get Messages");
            });
    }







    return (

        <div class="title">
            <Canvas>
                <Top />
                {/* <AccordionCustom />  */}
                <div className='inbox-body-container'>
                    
                        <div className="inbox-body">
                        {listOfMessages.map((Message => (
                            <InboxAccordion

                                // Avatar image
                                from={Message.recieverEmail}

                                // Put name here
                                title={Message.subject}

                                // Date will go here
                                date={(new Date(Message.date)).toLocaleDateString()}

                                // Message will go here
                                content={Message.body}

                            />
                            )))}
                        </div>
                   
                </div>

                {/* <Accordion /> */}

            </Canvas>
        </div>

    );
}





export default Inbox;
