 import React, { useState }  from 'react';
import './speciality.css';
import './appointments.css';
import './doctors.css';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link} from "react-router-dom";

import ReactDOM from "react-dom";

import DoctorSearch from "./DoctorSearch";
import ScheduleCalendar from "./ScheduleCalendar";


function Doctors() {



  

  return (
    
      <div className='appointments'>
        <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>
                <div className='Doctors-card' data-toggle="modal" data-target="#myModal">
                    
                    <DoctorSearch/>

                   
                </div>

               
            </div>
                
                
            </div>
                
        <Footer/>
      </div>

      
        
  
  )
};

export default Doctors;