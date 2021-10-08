import React from 'react'
import "./inbox.css";

import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';
import Tabs from '@restart/ui/esm/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Button, Nav } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap';
import Message from '../components/inbox components/message';

import Navbar from '../components/Navbar/Navbar';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../components/Canvas.css';
import Footer from '../components/Footer';
import Top from "../components/inbox components/Top"
import AccordionCustom from '../components/inbox components/AccordionCustom';




class Inbox extends React.Component {
    render() {
        return (

            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            <Top />
                            <AccordionCustom /> 
                            
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
