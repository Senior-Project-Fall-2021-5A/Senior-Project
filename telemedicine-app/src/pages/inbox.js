import React from 'react'
import "./inbox.css";

//Not used yet
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';

import Tabs from '@restart/ui/esm/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from '../components/Navbar/Navbar';
import { Card, Button, Nav } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap';
import Message from '../components/inbox components/message';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../components/Canvas.css';
import Footer from '../components/Footer';
import Top from "../components/inbox components/Top"




class Inbox extends React.Component {
    render() {
        return (

            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            <Top />
                            
                            {/* <div className="accordion">
                                    {data.map((item, i) => (
                                        <div className="item">
                                            <div className="title">
                                                <h2>{item.message}</h2>
                                            </div>
                                            <div className="content">
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}


                            {/* <div className="emailList">
                                    <div className="top">
                                        <h1 className="title">Inbox</h1>
                                        <Button classname="button" variant="primary">Compose</Button>
                                        <Message />
                                    </div>
                                    

                                </div> */}

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
