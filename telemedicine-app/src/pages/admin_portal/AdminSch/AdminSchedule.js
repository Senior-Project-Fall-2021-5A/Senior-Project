import React from 'react'
import './adminSchedule.css'
import PropTypes from 'prop-types'
import CheckBox from '../../../components/Objects/CheckBox'

const AdminSchedule = ({  }) => {
    //declarations
    const [checkedMon, setCheckedMon] = React.useState(false);
    const [checkedTues, setCheckedTues] = React.useState(false);
    const [checkedWed, setCheckedWed] = React.useState(false);
    const [checkedThurs, setCheckedThurs] = React.useState(false);
    const [checkedFri, setCheckedFri] = React.useState(false);
    const [checkedSat, setCheckedSat] = React.useState(false);
    const [checkedSun, setCheckedSun] = React.useState(false);
    

    const handleChangeMon = (event) => {
        console.log(event);
        let bCheck = !checkedMon;
        setCheckedMon(bCheck);
        console.log("Monday", bCheck);
    }
    const handleChangeTues = (event) => {
        console.log(event);
        let bCheck = !checkedTues;
        setCheckedTues(bCheck);
        console.log("Tuesday", bCheck);
    }
    const handleChangeWed = (event) => {
        console.log(event);
        let bCheck = !checkedWed;
        setCheckedWed(bCheck);
        console.log("Wednesday", bCheck);
    }
    const handleChangeThurs = (event) => {
        console.log(event);
        let bCheck = !checkedThurs;
        setCheckedThurs(bCheck);
        console.log("Thursday", bCheck);
    }
    const handleChangeFri = (event) => {
        console.log(event);
        let bCheck = !checkedFri;
        setCheckedFri(bCheck);
        console.log("Friday", bCheck);
    }
    const handleChangeSat = (event) => {
        console.log(event);
        let bCheck = !checkedSat;
        setCheckedSat(bCheck);
        console.log("Saturday", bCheck);
    }
    const handleChangeSun = (event) => {
        console.log(event);
        let bCheck = !checkedSun;
        setCheckedSun(bCheck);
        console.log("Sunday", bCheck);
    }
    
    //draw
    return (
        <div className='adminschedule-container'>
            
            <div className='adminschedule-header-frame'>
                <h1>Schedule</h1>
            </div>
            <div className='adminschedule-checkboxes-label-frame'>
                <p className='adminschedule-checkboxes-label-label'>Standard Days Off:</p>
            </div>
            <div className='adminschedule-checkboxes'>
                <CheckBox 
                    label="Monday"
                    name="boxMonday"
                    value={checkedMon}
                    onChange={handleChangeMon}
                />
                <CheckBox 
                    label="Tuesday"
                    name="boxTuesday"
                    value={checkedTues}
                    onChange={handleChangeTues}
                />
                <CheckBox 
                    label="Wednesday"
                    name="boxWednesday"
                    value={checkedWed}
                    onChange={handleChangeWed}
                />
                <CheckBox 
                    label="Thursday"
                    name="boxThursday"
                    value={checkedThurs}
                    onChange={handleChangeThurs}
                />
                <CheckBox 
                    label="Friday"
                    name="boxFriday"
                    value={checkedFri}
                    onChange={handleChangeFri}
                />
                <CheckBox 
                    label="Saturday"
                    name="boxSaturday"
                    value={checkedSat}
                    onChange={handleChangeSat}
                />
                <CheckBox 
                    label="Sunday"
                    name="boxSunday"
                    value={checkedSun}
                    onChange={handleChangeSun}
                />
            </div>
            <div className='adminschedule-calender-label'>
                
            </div>
            <div className='adminschedule-calender'>calender</div>
            <div className='adminschedule-time-list'>times</div>
            
       

        </div>
    )
}



export default AdminSchedule

