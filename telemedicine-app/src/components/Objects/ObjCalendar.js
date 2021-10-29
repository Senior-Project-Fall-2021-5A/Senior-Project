import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { propTypes } from 'prop-types'

const ObjCalendar = ({ name, value, onChange }) => {
    

    return (
        <div>            
            <Calendar
                name={name}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

ObjCalendar.defaultProps = {

}

ObjCalendar.propTypes = {
    
}

export default ObjCalendar
