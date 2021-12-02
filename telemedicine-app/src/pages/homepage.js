import React, { useState, Component }from 'react';
import "./homepage.css";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import MessageButton from '../components/MessageButton';
import InboxWidget from '../components/Homepage/InboxWidget';
import ReportsWidget from '../components/Homepage/ReportsWidget';
import AppointmentWidget from '../components/Homepage/AppointmentWidget';

function Homepage() {
    return (
        <div className='homepage'>
            <Navbar/>
            <div className='page-canvas-outer'>
                <div className='page-canvas-inner'>
                    <div className='canvas'>
                        <div className='Dashboard-row'>
                            <div className='dash-left'>
                                <AppointmentWidget/>
                            </div>
                            <div className='dash-right'>
                                <div className='right-top'>
                                    <InboxWidget/>
                                </div>
                                <div className='right-bottom'>
                                    <ReportsWidget/>
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