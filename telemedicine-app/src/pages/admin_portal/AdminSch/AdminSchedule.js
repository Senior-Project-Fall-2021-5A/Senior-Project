import React from 'react'
import './adminSchedule.css'
import PropTypes from 'prop-types'
import AdminSchDaysOff from './AdminSchDaysOff'
import AdminSchCalendar from './AdminSchCalendar'
import AdminSchTimes from './AdminSchTimes'

const AdminSchedule = ({  }) => {

    
    //draw
    return (
        <div className='adminschedule-container'>
            
            <div className='adminschedule-header-frame'>
                <h1>Schedule</h1>
            </div>
            <div className='adminschedule-checkboxes-label-frame'>
                <p className='adminschedule-checkboxes-label'>Standard Days Off:</p>
            </div>
            <div className='adminschedule-checkboxes-frame'>
                <AdminSchDaysOff/>
            </div>
            <div className='adminschedule-calender-label-frame'>
                <h3 className='adminschedule-calender-label'>Select Day of the Week</h3>
                <p className='adminschedule-calender-label'>to see Schedule and Appointments</p>
            </div>
            <div className='adminschedule-calender-frame'>
                <AdminSchCalendar/>
            </div>
            <div className='adminschedule-time-list-frame'>
                <AdminSchTimes/>
            </div>
            
       

        </div>
    )
}



export default AdminSchedule

