import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import authUserObject from '../../../middleware/authUserObject';
import PropTypes from 'prop-types';
import './adminSchTimes.css';
import ObjCheckBox from '../../../components/Objects/ObjCheckBox'

const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}
const styleTDBox = {
    paddingTop: '5px',
    paddingBottom: '0px',
    
}

const AdminSchTimes = ({ calDate, func }) => {
    //declarations
    const [arrAppt, setArrAppt] = React.useState([]);
    const [checkedTime01, setCheckedTime01] = React.useState(false);
    const [checkedTime02, setCheckedTime02] = React.useState(false);
    const [checkedTime03, setCheckedTime03] = React.useState(false);
    const [checkedTime04, setCheckedTime04] = React.useState(false);
    const [checkedTime05, setCheckedTime05] = React.useState(false);
    const [checkedTime06, setCheckedTime06] = React.useState(false);
    const [checkedTime07, setCheckedTime07] = React.useState(false);
    const [checkedTime08, setCheckedTime08] = React.useState(false);
    const [checkedTime09, setCheckedTime09] = React.useState(false);
    const [checkedTime10, setCheckedTime10] = React.useState(false);
    const [checkedTime11, setCheckedTime11] = React.useState(false);
    const [checkedTime12, setCheckedTime12] = React.useState(false);
    const [checkedTime13, setCheckedTime13] = React.useState(false);
    const [checkedTime14, setCheckedTime14] = React.useState(false);
    const [checkedTime15, setCheckedTime15] = React.useState(false);
    const [checkedTime16, setCheckedTime16] = React.useState(false);

    //Time Fields
    const data = [
        {boxName: "time01", boxValue: checkedTime01, text: "09:00 am"},
        {boxName: "time02", boxValue: checkedTime02, text: "09:30 am"},
        {boxName: "time03", boxValue: checkedTime03, text: "10:00 am"},
        {boxName: "time04", boxValue: checkedTime04, text: "10:30 am"},
        {boxName: "time05", boxValue: checkedTime05, text: "11:00 am"},
        {boxName: "time06", boxValue: checkedTime06, text: "11:30 am"},
        {boxName: "time07", boxValue: checkedTime07, text: "12:00 pm"},
        {boxName: "time08", boxValue: checkedTime08, text: "12:30 pm"},
        {boxName: "time09", boxValue: checkedTime09, text: "01:00 pm"},
        {boxName: "time10", boxValue: checkedTime10, text: "01:30 pm"},
        {boxName: "time11", boxValue: checkedTime11, text: "02:00 pm"},
        {boxName: "time12", boxValue: checkedTime12, text: "02:30 pm"},
        {boxName: "time13", boxValue: checkedTime13, text: "03:00 pm"},
        {boxName: "time14", boxValue: checkedTime14, text: "03:30 pm"},
        {boxName: "time15", boxValue: checkedTime15, text: "04:00 pm"},
        {boxName: "time16", boxValue: checkedTime16, text: "04:30 pm"},        
    ];

    /************************************************************************
     *          Handlers
     ************************************************************************/
    //Load Patients and Doctors
    useEffect(() => {
        //console.log("AdminSchTimes - calDate: ",calDate);  
        getAppointments();
    }, [calDate]);

    /************************************************************************
                Axios Get
    ************************************************************************/
    const getAppointments = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointmentsByDate/${authUserObject.userId}/${calDate}`)
        .then((response) => {
            //console.log('getAppointments - response:', response)
            let arrData = response.data;
            setArrAppt(arrData);
            //console.log("arrData: ",arrData);
            if(Array.isArray(arrData)){
                checkTimeBoxes(arrData);
            } else {
                clearTimeBoxes();
            }
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments for selected date");
        });
    }

    /************************************************************************
                Axios Post
    ************************************************************************/
    const setAppointments = (objAppt) => {
        //console.log("aetAppointments() - objAppt:",objAppt );
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment`, {
            userUID:    objAppt.userUID,
            doctorUID:  objAppt.doctorUID,
            date:       objAppt.date,
            time:       objAppt.time,
            type:       objAppt.type,
        }).then(response => {
            //console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    const cancelAppt = (id) => {
        //console.log("cancelAppt() - id:",id );
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/cancelAppt/${id}`, {            
        }).then(response => {
            //console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    /************************************************************************
                Functions
    ************************************************************************/
    const clearTimeBoxes = () => {
        setCheckedTime01(false);
        setCheckedTime02(false);
        setCheckedTime03(false);
        setCheckedTime04(false);
        setCheckedTime05(false);
        setCheckedTime06(false);
        setCheckedTime07(false);
        setCheckedTime08(false);
        setCheckedTime09(false);
        setCheckedTime10(false);
        setCheckedTime11(false);
        setCheckedTime12(false);
        setCheckedTime13(false);
        setCheckedTime14(false);
        setCheckedTime15(false);
        setCheckedTime16(false);
    }
    
    const setTimeBox = (value) => {
        switch(value.substring(0,5)){
            case '09:00':
                return setCheckedTime01(true);
            case '09:30':
                return setCheckedTime02(true);
            case '10:00':
                return setCheckedTime03(true);
            case '10:30':
                return setCheckedTime04(true);
            case '11:00':
                return setCheckedTime05(true);
            case '11:30':
                return setCheckedTime06(true);
            case '12:00':
                return setCheckedTime07(true);
            case '12:30':
                return setCheckedTime08(true);
            case '01:00':
                return setCheckedTime09(true);
            case '01:30':
                return setCheckedTime10(true);
            case '02:00':
                return setCheckedTime11(true);
            case '02:30':
                return setCheckedTime12(true);
            case '03:00':
                return setCheckedTime13(true);
            case '03:30':
                return setCheckedTime14(true);
            case '04:00':
                return setCheckedTime15(true);
            case '04:30':
                return setCheckedTime16(true);
        }
    }

    const checkTimeBoxes = (arrData) => {
        arrData.forEach(e=>{
            setTimeBox(e.time);            
        });
    }

    const handleBoxTimeChange = (event) => {
        //console.log("event:",event);
        //console.log("name:",event.target.name);
        //console.log("label:",event.target.parentNode.control.attributes.label.nodeValue);

        let boxName = event.target.name;
        if (boxName == "time01"){
            let doAdd = !checkedTime01;
            setCheckedTime01(doAdd);
            bookTime("09:00 am",doAdd);
        } else if (boxName == "time02"){
            let doAdd = !checkedTime02;
            setCheckedTime02(doAdd);
            bookTime("09:30 am",doAdd);
        } else if (boxName == "time03"){
            let doAdd = !checkedTime03;
            setCheckedTime03(doAdd);
            bookTime("10:00 am",doAdd);
        } else if (boxName == "time04"){
            let doAdd = !checkedTime04;
            setCheckedTime04(doAdd);
            bookTime("10:30 am",doAdd);
        } else if (boxName == "time05"){
            let doAdd = !checkedTime05;
            setCheckedTime05(doAdd);
            bookTime("11:00 am",doAdd);
        } else if (boxName == "time06"){
            let doAdd = !checkedTime06;
            setCheckedTime06(doAdd);
            bookTime("11:30 am",doAdd);
        } else if (boxName == "time07"){
            let doAdd = !checkedTime07;
            setCheckedTime07(doAdd);
            bookTime("12:00 pm",doAdd);
        } else if (boxName == "time08"){
            let doAdd = !checkedTime08;
            setCheckedTime08(doAdd);
            bookTime("12:30 pm",doAdd);
        } else if (boxName == "time09"){
            let doAdd = !checkedTime09;
            setCheckedTime09(doAdd);
            bookTime("01:00 pm",doAdd);
        } else if (boxName == "time10"){
            let doAdd = !checkedTime10;
            setCheckedTime10(doAdd);
            bookTime("01:30 pm",doAdd);
        } else if (boxName == "time11"){
            let doAdd = !checkedTime11;
            setCheckedTime11(doAdd);
            bookTime("02:00 pm",doAdd);
        } else if (boxName == "time12"){
            let doAdd = !checkedTime12;
            setCheckedTime12(doAdd);
            bookTime("02:30 pm",doAdd);
        } else if (boxName == "time13"){
            let doAdd = !checkedTime13;
            setCheckedTime13(doAdd);
            bookTime("03:00 pm",doAdd);
        } else if (boxName == "time14"){
            let doAdd = !checkedTime14;
            setCheckedTime14(doAdd);
            bookTime("03:30 pm",doAdd);
        } else if (boxName == "time15"){
            let doAdd = !checkedTime15;
            setCheckedTime15(doAdd);
            bookTime("04:00 pm",doAdd);
        } else if (boxName == "time16"){
            let doAdd = !checkedTime16;
            setCheckedTime16(doAdd);
            bookTime("04:30 pm",doAdd);
        }
    }

    const bookTime = ( timeInput, doAdd ) => {
        
        if (doAdd){
            let appt = {
                userUID: authUserObject.userId,
                doctorUID: authUserObject.userId,
                date: calDate,
                time: timeInput,
                type: "Personal",
            }
            //console.log("Add - appt:",appt);
            setAppointments(appt);
            getAppointments();
        } else {
            let id = "";
            arrAppt.forEach(e=>{
                if(e.time == timeInput){
                    id = e._id;
                }
            });

            //remove 
            cancelAppt(id);
        }
        
        
    }
    
    return (
        <div className='adminschtimes-container'>
            <table id="timesSch" class='table'>
                <tbody>
                    {data.map(({boxName, boxValue, text}) =>(
                        <tr key={boxName}>
                            <td style={styleTDBox}>
                                <ObjCheckBox
                                    label=""
                                    name={boxName}
                                    value={boxValue}
                                    onChange={e => handleBoxTimeChange(e)}
                                />
                            </td>                        
                            <td style={styleTD}>{text}</td>                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 

export default AdminSchTimes
