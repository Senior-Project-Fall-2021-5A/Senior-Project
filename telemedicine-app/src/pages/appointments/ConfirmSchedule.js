import React from 'react';
import './appointments.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Axios from 'axios'
import {Link, useParams} from "react-router-dom";

const ConfirmSchedule = () => {

    const { doc, type, date, time } = useParams();

    const userId = '61a90dbcfeeffc47cc29bb84';

     const [txtLocSelect,setLocSelect] = React.useState("");
     const [txtLocation,setLocation] = React.useState("");

    const submitAppointment = () => {
    console.log("Patient: " + userId, "Doctor: " + doc, "Date: " + date, "Time: " + time);
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {
                userUID:        userId,
                doctorUID:      doc,
                date:           date,
                time:           time,
                type:           type,
                locationUID:    "",
        
        }).then((response) => {
            console.log(response)

        });
    }

    const onSubmit = (event) => {
        submitAppointment();
    }

    

    return (
    <div className='appointments'>
        <Navbar/>
        <div className='Appointments-container-outer'>
        <div className='Appointments-container-inner'>

            <h2>{ type } Appointment Scheduled for { date }</h2>
            <h2>at { time } with { doc }</h2>

            <div className="buttons-container">

                <Link to={'/NoAppointments'}>
                    <button type="button" class="btn btn-success" onClick={e=>onSubmit(e)}>Continue</button>
                </Link>

                {" "}

                <Link to={`/DoctorSearch`}>
                    <button type="button" class="btn btn-primary">Start Over</button>
                </Link>

            </div>
            
        </div>
        </div>
        <Footer/>
    </div>
    )
}

export default ConfirmSchedule;