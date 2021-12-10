import React from 'react';
import { useEffect } from 'react';
import './adminSchedule.css'
import PropTypes from 'prop-types'
import AdminSchDaysOff from './AdminSchDaysOff'
import AdminSchCalendar from './AdminSchCalendar'
import AdminSchTimes from './AdminSchTimes'

const AdminSchedule = ({  }) => {
    const [calDate, setCalDate] = React.useState(new Date());
    
    /***************************************************************
                Functions
    ***************************************************************/
    const pullDate = ( date ) => {
        //console.log("AdminSchedule - date: ",date);
        setCalDate(date);
    }

    
    //draw
    return (
        <div className='adminschedule-container'>
            <div>
                
            </div>
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
                <AdminSchCalendar
                    func={pullDate}
                />
            </div>
            <div className='adminschedule-time-list-frame'>
                <AdminSchTimes
                    calDate={calDate.toLocaleDateString("en-US").split('/').join('-')}
                />
            </div>
        </div>
    )
}



export default AdminSchedule

