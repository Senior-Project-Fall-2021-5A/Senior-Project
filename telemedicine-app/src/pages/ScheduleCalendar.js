import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import moment from 'moment'
import './appointments.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import './calendar.css';
import { Modal, Button } from 'react-bootstrap';

import {Link} from "react-router-dom";

function ScheduleCalendar() {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
      setDateState(e)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
     <div className='appointments'>
        <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>
              <div className='Appointments-card'>
             
                  <Calendar className="calendar-container"
        
                    value={dateState}
                    onChange={changeDate}
                  />

                  <div className="calendar-text">
                     <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
                  </div>

                  <div className="confirm-date">
                     <button type="button" class="date-btn" onClick={handleShow}>Confirm Date</button>
                  </div>

                  <Modal show={show} onHide={handleClose} centered >
                    
                  
                    <Modal.Body className="custom-modal-style">

                    <Link to='/confirmSchedule'>
                    
                    <button class="time-btn">9:00 - 11:00</button>
                    <button class="time-btn">1:00 - 3:00</button>
                    <button class="time-btn">3:00 - 5:00</button>
                    <button class="time-btn">7:00 - 9:00</button>
                   
                   </Link>
                    
                    
                    </Modal.Body>
                    
                  </Modal>
                

              </div>

            </div>    
            </div>
                
        <Footer/>
     </div>
  );
}

export default ScheduleCalendar;