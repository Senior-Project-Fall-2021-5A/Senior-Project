import React from 'react'
import "./inbox.css";
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas.css';
import Footer from '../../components/Footer/Footer';
import Top from "../../components/inbox components/Top"
import InboxAccordion from '../../components/inbox components/InboxAccordion'
import { Link } from 'react-router-dom';
import Axios from 'axios'




class Inbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listOfMessages: []
        };
    }
    
    componentDidMount() {
        this.getMessages();
    }


    getMessages(){
        Axios.get('https://telemedicine5a-backend.herokuapp.com/inbox/getInbox')
        .then((response) => {
            this.setState({listOfMessages: response})
            console.log(this.state.listOfMessages)
        })
        .catch((err) => {
            console.log(err, "Unable to get Messages");
        });
    }
    
    render() {

        return (

            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            <Top />
                            {/* <AccordionCustom />  */}
                        <div className= 'inbox-body-container'>
                        {Object.values(this.state.listOfMessages).map(Message => {
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

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            // comment for pushing



        )
    }
}

const data = [
    {
        message: "Message 1",
        content: "Sowiejgowijgowjgwoijgoiwejgoijesethserthdrhse"
    },
    {
        message: "Message 2",
        content: "Sowiejgowijgowjgwoijgoiwejgoije"
    }
]


export default Inbox;
