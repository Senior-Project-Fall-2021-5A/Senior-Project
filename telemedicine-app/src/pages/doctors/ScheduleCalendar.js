import React, { useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment'

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import '../appointments/appointments.css';
import { Modal, Button } from 'react-bootstrap';

import { Link, useParams } from "react-router-dom";

import DoctorTime from './DoctorTime';
import './DoctorTime.css';

import Axios from 'axios';

import DatePicker from "react-datepicker";

const ScheduleCalendar = () => {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
      setDateState(e)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { doc, type } = useParams();

  const [daysOff, setDaysOff] = useState([]);

   const [date,setDate] = React.useState(new Date());

  useEffect(() => {
	 
        createSchedule();
		
	}, [])

  const createSchedule = () => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDaysOff')
            .then((response) => {                
                setDaysOff(response.data);
            }).catch((err) => {
                console.log(err, "Unable to get days off");
            });
    }

  return (
     <div className='appointments'>
        <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>
              <div className='Appointments-card'>
             
                 <DatePicker                            
                    selected={date}
                    onChange={e=>setDate(e)}
                />

                  <div className="calendar-text">
                     <p>Current selected date is <b></b></p>
                  </div>
                  
                  <div className="confirm-date">
                     <button type="button" class="btn btn-success" onClick={handleShow}>Confirm Date</button>
                  </div>

                  <Modal show={show} onHide={handleClose} centered >
                    
                  
                    <Modal.Body className="custom-modal-style">

                   

                       {DoctorTime.map((item, index) => {
                          return (
                             <Link to={`/ConfirmSchedule/${doc}/${type}/${date}/${item.label}`}>
                               <div className="time-container">
                                <button class="btn btn-primary btn-sm outline">{item.label}</button>
                               </div>
                             </Link>
                          )

                       })}
                   
  
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