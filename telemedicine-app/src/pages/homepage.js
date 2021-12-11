import React, { useState, Component, useEffect }from 'react';
import "./homepage.css";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Canvas from '../components/Canvas'
import MessageButton from '../components/MessageButton';
import InboxWidget from '../components/Homepage/InboxWidget';
import ReportsWidget from '../components/Homepage/ReportsWidget';
import AppointmentWidget from '../components/Homepage/AppointmentWidget';
import  Axios  from 'axios';
import authUserObject from '../middleware/authUserObject';
import $ from 'jquery';

function Homepage() {
    const [UserName, setUserName] = useState([]);

    $(document).ready(function(){
        $('div.canvas').slideDown(400);
    });

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${authUserObject.userId}`)        
            .then((response) => {                         
                //console.log("Username info:", response);
                const myUserName = response.data;
                setUserName(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, []);

    return (
        <div className='homepage'>
            <Canvas className="canvas">
                
                <div className='Dashboard-row'>
                    <div className='dash-left'>
                        <AppointmentWidget className="homeapptwidget"/>
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
            </Canvas>
        </div>
    )
}

export default Homepage;