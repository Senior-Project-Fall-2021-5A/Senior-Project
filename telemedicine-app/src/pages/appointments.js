import React, { useState }  from 'react';
import './appointments.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import Speciality from '../pages/speciality';

import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link} from "react-router-dom";

import ReactDOM from "react-dom";


function Appointments() {

 const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };

   
	return (

   
		<div className='appointments'>
            <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>
                <div className='Appointments-card'>
                  <Link to='/doctors'>
                    <Button className="button">
                        Create New
                    </Button>
                  </Link>
                
                

                    <div className="accordion-container">

                      <div className="accordion">
              
                        <div className="accordion-header" onClick={handleOpen}>
                            <div className="date">Date</div>
                            <div className="time">time</div>
                            <div className="subject">Subject</div>
                            <div className="status">Status: Active</div>
                            <div className="sign">{show ? '-' : '+'}</div>
                        </div>
                        {show && (
                          <div className="accordion-body">
                          <div className="note">Note:</div>
                              <div className="doctor">Dr Name</div>
                              <div className="address">Address</div>
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


                      <div className="accordion">
                      
                        <div className="accordion-header" onClick={handleOpen}>
                            <div className="date">Date</div>
                            <div className="time">time</div>
                            <div className="subject">Subject</div>
                            <div className="status">Status: Active</div>
                            <div className="sign">{show ? '-' : '+'}</div>
                        </div>
                        {show && (
                          <div className="accordion-body">
                              <div className="doctor">Dr Name</div>
                              <div className="address">Address</div>
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

                      <div className="accordion">
                      
                        <div className="accordion-header" onClick={handleOpen}>
                            <div className="date">Date</div>
                            <div className="time">time</div>
                            <div className="subject">Subject</div>
                            <div className="status">Status: Active</div>
                            <div className="sign">{show ? '-' : '+'}</div>
                        </div>
                        {show && (
                          <div className="accordion-body">
                              <div className="doctor">Dr Name</div>
                              <div className="address">Address</div>
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
            <Footer/>
        </div>
	
	)
    
}

export default Appointments