import React from 'react';
import { useEffect } from 'react';
import ObjCalendar from '../../../components/Objects/ObjCalendar';
import AdminAptsTable from '../AdminApts/AdminAptsTable';

const AdminSchCalendar = ({func}) => {
    //declarations
    const [CalValue, setCal] = React.useState(new Date());

    /**************************************************
                    Functions
    **************************************************/
    const setDateValue = ( date ) => {
        setCal(date);
        func(date);
    }

    /**************************************************
                    HTML
    **************************************************/
    return (
        <div>
            <ObjCalendar
                name="CalcAdminSch"
                value={CalValue}
                onChange={date => setDateValue(date)}
            />
        </div>
    )
}

export default AdminSchCalendar
