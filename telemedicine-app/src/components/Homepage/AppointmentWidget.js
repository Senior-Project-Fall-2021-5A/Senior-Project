import {React,useEffect,useState} from 'react'
import {Card, Button, Nav} from 'react-bootstrap'
import './AppointmentWidget.css'
import  Axios  from 'axios';
import authUserObject from '../../middleware/authUserObject';


function AppointmentWidget() {
    const [appointmentInfo, setinsuranceInfo] = useState([]);

    var userId = String(authUserObject.userId)

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${userId}`)
            .then((response) => {
                console.log("appointment info:",response);
                var arrdata = response.data.reverse();
                console.log("this is the auth user:", authUserObject.userId);
                console.log(arrdata[0])
                setinsuranceInfo([arrdata[0]]);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, []);
    return (
        
        <Card className='Appointment-Widget'>
        <Card.Header className='appointment-card-nav'>
                    <Nav variant="pills" defaultActiveKey="#first">
                        <h4 className='appointment-widget-heading'>
                            Next Upcoming Appointment
                        </h4>
                    </Nav>
        </Card.Header>
                {appointmentInfo.map((appointment) => (
                <Card.Body>
                        <Card.Text>
                            Please refer to the information below for a breif description of your upcoming appointment.{appointment.appNotes}
                        </Card.Text>
                        <Card.Text>
                            <p style={{fontWeight:"bold"}}>Appointment Date:</p> {appointment.date}
                        </Card.Text>
                        <Card.Text>
                            <p style={{fontWeight:"bold"}}>Appointment Time:</p> {appointment.time}
                        </Card.Text>
                        <Card.Text>
                            <p style={{fontWeight:"bold"}}>Appointment Notes: </p><p className="appointment-widget-content">{appointment.apptNotes}</p>
                        </Card.Text>
                        <Button variant="primary" href='/NoAppointments'>
                            More Information
                        </Button>
                    </Card.Body>
        ))}
        </Card>
    )
}

export default AppointmentWidget
