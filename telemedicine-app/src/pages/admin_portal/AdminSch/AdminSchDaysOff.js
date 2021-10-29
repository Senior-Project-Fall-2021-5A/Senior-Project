import React from 'react'
import ObjCheckBox from '../../../components/Objects/ObjCheckBox'

const AdminSchDaysOff = () => {
    //declarations
    const [checkedMon, setCheckedMon] = React.useState(false);
    const [checkedTues, setCheckedTues] = React.useState(false);
    const [checkedWed, setCheckedWed] = React.useState(false);
    const [checkedThurs, setCheckedThurs] = React.useState(false);
    const [checkedFri, setCheckedFri] = React.useState(false);
    const [checkedSat, setCheckedSat] = React.useState(false);
    const [checkedSun, setCheckedSun] = React.useState(false);


    const handleDayCBChange = (event) => {
        console.log("event:",event);
        console.log("name:",event.target.name);
        console.log("label:",event.target.parentNode.control.attributes.label.nodeValue);

        let targetName = event.target.name;
        if (targetName === "boxMonday") {
            let bCheck = !checkedMon;
            setCheckedMon(bCheck);
            console.log("Monday", bCheck);
        } else if (targetName === "boxTuesday") {
            let bCheck = !checkedTues;
            setCheckedTues(bCheck);
            console.log("boxTuesday", bCheck);
        } else if (targetName === "boxWednesday") {
            let bCheck = !checkedWed;
            setCheckedWed(bCheck);
            console.log("boxWednesday", bCheck);
        } else if (targetName === "boxThursday") {
            let bCheck = !checkedThurs;
            setCheckedThurs(bCheck);
            console.log("boxThursday", bCheck);
        } else if (targetName === "boxFriday") {
            let bCheck = !checkedFri;
            setCheckedFri(bCheck);
            console.log("boxFriday", bCheck);
        } else if (targetName === "boxSaturday") {
            let bCheck = !checkedSat;
            setCheckedSat(bCheck);
            console.log("boxSaturday", bCheck);
        } else if (targetName === "boxSunday") {
            let bCheck = !checkedSun;
            setCheckedSun(bCheck);
            console.log("boxSunday", bCheck);
        }
    }

    return (
        <div className='adminschedule-checkboxes'>
            <ObjCheckBox 
                    label="Monday"
                    name="boxMonday"
                    value={checkedMon}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Tuesday"
                    name="boxTuesday"
                    value={checkedTues}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Wednesday"
                    name="boxWednesday"
                    value={checkedWed}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Thursday"
                    name="boxThursday"
                    value={checkedThurs}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Friday"
                    name="boxFriday"
                    value={checkedFri}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Saturday"
                    name="boxSaturday"
                    value={checkedSat}
                    onChange={e => handleDayCBChange(e)}
                />
                <ObjCheckBox 
                    label="Sunday"
                    name="boxSunday"
                    value={checkedSun}
                    onChange={e => handleDayCBChange(e)}
                />
        </div>
    )
}

export default AdminSchDaysOff
