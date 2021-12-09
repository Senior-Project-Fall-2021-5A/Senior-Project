import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import authUserObject from '../../../middleware/authUserObject';//'../middleware/authUserObject';
import ObjCheckBox from '../../../components/Objects/ObjCheckBox';


const AdminSchDaysOff = () => {
    //declarations
    const [arrDays, setArrDays] = React.useState([]);
    const [txtDays, setDays] = React.useState("");
    const [checkedMon, setCheckedMon] = React.useState(false);
    const [checkedTues, setCheckedTues] = React.useState(false);
    const [checkedWed, setCheckedWed] = React.useState(false);
    const [checkedThurs, setCheckedThurs] = React.useState(false);
    const [checkedFri, setCheckedFri] = React.useState(false);
    const [checkedSat, setCheckedSat] = React.useState(false);
    const [checkedSun, setCheckedSun] = React.useState(false);

    /***************************************************** 
                    Handlers
    ******************************************************/
    //on open
    useEffect(() => {
        getListDaysOff();
    }, []);

    /***************************************************** 
                    Axios Get
    ******************************************************/
    const getListDaysOff = (  ) => {
        console.log("getListDaysOff() - starting");
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/daysOff/getDaysOff/${authUserObject.userId}`)
            .then((response) => {   
                console.log("getListDaysOff() - response:",response);             
                let data = response.data;           
                console.log("list of docs response:",data);
                if(data[0]){
                    let arrDaysGet = data.daysOff.split("|");
                    setBoxDaysOff(arrDaysGet);
                }
            }).catch((err) => {
                console.log(err, "Unable to get doctors/getDoctorInfo");
            });
    }

    /***************************************************** 
                    Axios Post
    ******************************************************/
    const setListDaysOff = (arrDaysPush) => {
        console.log("setListDaysOff() - arrDaysPush:",arrDaysPush );
        /* Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/addDaysOff`, {
            doctorUID:  authUserObject.userId,
            daysOff:    arrDaysPush.join("|"),
        }).then(response => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        }) */
    }

    /***************************************************** 
                    Functions
    ******************************************************/
    const setBoxDaysOff = (arrDaysGet) => {
        console.log("setBoxDaysOff() - arrDaysGet:",arrDaysGet);
        if(arrDaysGet.includes("Monday")){
            setCheckedMon(true);
        } else if(arrDaysGet.includes("Tuesday")){
            setCheckedTues(true);
        } else if(arrDaysGet.includes("Wednesday")){
            setCheckedWed(true);
        } else if(arrDaysGet.includes("Thursday")){
            setCheckedThurs(true);
        } else if(arrDaysGet.includes("Friday")){
            setCheckedFri(true);
        } else if(arrDaysGet.includes("Saturday")){
            setCheckedSat(true);
        } else if(arrDaysGet.includes("Sunday")){
            setCheckedSun(true);
        }
    }

    const handleDayCBChange = (event) => {
        console.log("handleDayCBChange() - event:",event);
        
        let targetName = event.target.name;
        let targetLabel = event.target.attributes.label.nodeValue;
        let arrDaysPush = arrDays;
        console.log("handleDayCBChange() - targetName:",targetName,"targetLabel:",targetLabel,"arrDaysPush:",arrDaysPush);

        if (targetName === "boxMonday") {
            let bCheck = !checkedMon;
            setCheckedMon(bCheck);
            //console.log("Monday", bCheck);
        } else if (targetName === "boxTuesday") {
            let bCheck = !checkedTues;
            setCheckedTues(bCheck);
            //console.log("boxTuesday", bCheck);
        } else if (targetName === "boxWednesday") {
            let bCheck = !checkedWed;
            setCheckedWed(bCheck);
            //console.log("boxWednesday", bCheck);
        } else if (targetName === "boxThursday") {
            let bCheck = !checkedThurs;
            setCheckedThurs(bCheck);
            //console.log("boxThursday", bCheck);
        } else if (targetName === "boxFriday") {
            let bCheck = !checkedFri;
            setCheckedFri(bCheck);
            //console.log("boxFriday", bCheck);
        } else if (targetName === "boxSaturday") {
            let bCheck = !checkedSat;
            setCheckedSat(bCheck);
            //console.log("boxSaturday", bCheck);
        } else if (targetName === "boxSunday") {
            let bCheck = !checkedSun;
            setCheckedSun(bCheck);
            //console.log("boxSunday", bCheck);
        }

        arrDaysPush.push(targetLabel);
        setArrDays(arrDaysPush);
        setListDaysOff(arrDaysPush);
        console.log("handleDayCBChange() - arrDaysPush:",arrDaysPush);
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
