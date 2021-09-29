import React from 'react'
import {Card, Button, Nav} from 'react-bootstrap'
import './AppointmentWidget.css'

function AppointmentWidget() {
    return (
        <Card className='Appointment-Widget'>
        <Card.Header className='appointment-card-nav'>
            <Nav variant="pills" defaultActiveKey="#first">
                <h4 className='appointment-widget-heading'>
                    Next Upcoming Appointment
                </h4>
            </Nav>
        </Card.Header>
        <Card.Body>
            <Card.Title>Next Upcoming Appointment</Card.Title>
            <Card.Text>
                Please refer to the information below for a breif description of your upcoming appointment.
            </Card.Text>
            <Button variant="primary">More Information</Button>
        </Card.Body>
        </Card>
    )
}

export default AppointmentWidget
