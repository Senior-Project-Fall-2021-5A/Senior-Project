import React from 'react'
import ObjCalendar from '../../../components/Objects/ObjCalendar';

const AdminSchCalendar = () => {
    const [CalValue, setCal] = React.useState(new Date());

    const handleCalendar = (date) => {
        console.log("date:",date);
        setCal(date);
        
        console.log("getDate:", date.getDate());
        console.log("toDateString:", date.toDateString());
        console.log("valueOf:", date.valueOf());
        console.log("toUTCString:", date.toUTCString());
        console.log("toLocaleDateString:", date.toLocaleDateString());
        console.log("toJSON:", date.toJSON());
    }

    return (
        <div>
            <ObjCalendar
                name="CalcAdminSch"
                value={CalValue}
                onChange={date => handleCalendar(date)}
            />
        </div>
    )
}

export default AdminSchCalendar
