import React, { useState, Component }from 'react';
import "../components/Canvas.css";
import "./homepage.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import MessageButton from '../components/MessageButton';
import Inbox from '../components/Inbox';

function Homepage() {
    return (
        <div className='homepage'>
            <Navbar/>
            <div className='page-canvas-outer'>
                <div className='page-canvas-inner'>
                    <div className='canvas'>
                        <div className='Dashboard-row'>
                            <div className='dash-left'>
                            
                            </div>
                            <div className='dash-right'>
                                <div className='widget-header'>
                                    <h3>INBOX</h3>
                                </div>
                                <div className='right-top'>
                                    <Inbox/>
                                </div>
                                <div className='widget-header'>
                                    <h3>REPORTS</h3>
                                </div>
                                <div className='right-bottom'>
                                
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>  
            </div>
            <MessageButton/>
            <Footer/>
        </div>
    )
}

export default Homepage;