import React, { useState }  from 'react';
import './appointments.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';


import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link,useParams} from "react-router-dom";

import ReactDOM from "react-dom";

import './Tabs.css';

function NoAppointments() {

  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

   return (

       <div className='appointments'>
            <Navbar/>
                <div className='Appointments-container-outer'>
                    <div className='Appointments-container-inner'>
                        <div className='Appointments-card'>
                            <Link to='/DoctorSearch'>
                            <Button className="button">
                                Create New
                            </Button>
                            </Link>

                            <div>
                            <div className="bloc-tabs">
                                <button
                                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(1)}
                                >
                                    Upcoming 
                                </button>
                                <button
                                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(2)}
                                >
                                    Past
                                </button>
        
                            </div>

                            <div className="content-tabs">
                            <div
                                className={toggleState === 1 ? "content  active-content" : "content"}
                            >
                                <h4>All Upcoming Appointments</h4>
                                <hr />
                               
                            </div>

                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"}
                            >
                                <h4>All Past Appointments</h4>
                                <hr />

                                <div className="accordion-container">

                                    <div className="accordion">
              
                                        <div className="accordion-header" onClick={handleOpen}>
                                            <div className="date">September 5th 2021</div>
                                            <div className="time">7:00 p.m.</div>
                                            <div className="subject">In-person Appointment</div>
                                         
                                            <div className="sign">{show ? '-' : '+'}</div>
                                        </div>
                                        {show && (
                                            <div className="accordion-body">
                                            <div className="note">Note:</div>
                                                <div className="doctor">Doctor E</div>
                                                <div className="address">Address</div>
                                                <Link to='/client'>
                                                    <button className="btnCall">Start Call</button>
                                                </Link>
                                                <div className="textarea-container">
                                                    <textarea className="textarea-edit">
                                                    </textarea>
                                                </div>
                                                <div className="doctor-notes">Doctor Notes</div>
                                                <div className="reschedule">Reschedule</div>
                                                <div className="cancel-appointment">Cancel Appointment</div>
                         
                                            </div>
                                        )}
                                    </div>
                                 </div>
                          
                             </div>

                          </div>

                        </div>

                      </div>
                    </div>
                </div>
            <Footer/>
       </div>


   )


}

export default NoAppointments;