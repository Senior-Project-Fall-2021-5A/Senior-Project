 import React, { useState }  from 'react';

import './appointments.css';
import './doctors.css';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link, useParams} from "react-router-dom";

import ReactDOM from "react-dom";

import DoctorImage from './doctor_image.png';
import Monitor from './monitor.png';

import './AppointmentType.css';


function AppointmentType() {

const { name } = useParams();

  return (
    
      <div className='appointments'>
        <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>
               <div className='Appointments-card'>

               <div className='heading'>
               <h2>
               Book Appointment Type with Doctor { name }
               </h2>
               </div>

               <div class="row">
                 <div class="column">

                   <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={DoctorImage} />
                      <Card.Body>
                        <Card.Title>In-person</Card.Title>
                        <Card.Text>
                          Face-to-face appointments are within normal hours. Precautionary measures will be taken against the coronavirus by both patient and doctor.
                        </Card.Text>
                        <Link to={`/schedulecalendar/${name}/In-person`}>
                        <Button variant="primary">Book</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                 </div>

                 <div class="column">
                    <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={Monitor} />
                      <Card.Body>
                        <Card.Title>Online</Card.Title>
                        <Card.Text>
                          Save time and skip the waiting room. Schedule a video chat with your specialist.
                        </Card.Text>
                        <Link to={`/schedulecalendar/${name}/Online`}>
                        <Button variant="primary">Book</Button>
                        </Link>
                      </Card.Body>
                    </Card>

                  </div>

               </div>
               </div>

               
            </div>
                
                
            </div>
                
        <Footer/>
      </div>

      
        
  
  )
};

export default AppointmentType;