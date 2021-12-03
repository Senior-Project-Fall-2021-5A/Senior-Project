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






const Inbox = () => {

    const [listOfMessages, setListOfMessages] = React.useState([]);

    useEffect(() => {
        SendMessages();
    }, []);

    const SendMessages = () => {
        let userID = "61a80bf9d9e6a3effb3cc950";
        return Axios.post(`https://telemedicine5a-backend.herokuapp.com/inbox/sendMessage`, {
            senderID: userID,
            recieverID: "61a7c275d35cf2796a2dcba8",
            subject: "subject",
            body: "a message",
            // date: new Date(),
            isRead: false,
        }).then((response) => {
            console.log("SendMessages(), response: ", response);
        }).catch((err) => {
            console.log(err);

        });
    }


    // componentDidMount() {
    //     this.getMessages();
    // }


    return (

        <div class="title">
            <Canvas>
                <Top />
                {/* <AccordionCustom />  */}
                <div className='inbox-body-container'>
                    <h5>No Messages Currently</h5>
                    {(listOfMessages).map(Message => {
                        <div className="inbox-body">
                            <InboxAccordion

                                // Avatar image
                                from={Message.recieverEmail}

                                // Put name here
                                title={Message.subject}

                                // Date will go here
                                date={Message.date}

                                // Message will go here
                                content={Message.body}

                            />
                        </div>
                    })}
                </div>

                {/* <Accordion /> */}

            </Canvas>
        </div>

    )
}





export default Inbox;
