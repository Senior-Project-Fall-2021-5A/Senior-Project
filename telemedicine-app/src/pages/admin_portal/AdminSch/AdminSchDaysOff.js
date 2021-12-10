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
        //console.log("getListDaysOff() - starting");
        let data = [];
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/daysOff/getDaysOff/${authUserObject.userId}`)
            .then((response) => {   
                //console.log("getListDaysOff() - response:",response);             
                data = response.data[0];           
                //console.log("getListDaysOff data:",data);
                if(data){
                    let arrDaysGet = data.daysOff.split("|");
                    setBoxDaysOff(arrDaysGet);
                }
            }).catch((err) => {
                console.log(err, "Unable to get doctors/getDoctorInfo");
            });
    }

    const setListDaysOff = ( txtDays ) => {
        //console.log("checkDaysOff() - starting");
        let data = [];
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/daysOff/getDaysOff/${authUserObject.userId}`)
            .then((response) => {   
                //console.log("checkDaysOff() - response:",response);             
                data = response.data;           
                //console.log("checkDaysOff data:",data);
                if (data.length > 0){
                    updateDaysOff(txtDays);
                } else {
                    newDaysOff(txtDays);
                }
            }).catch((err) => {
                console.log(err, "Unable to get doctors/getDoctorInfo");
            });
    }

    /***************************************************** 
                    Axios Post
    ******************************************************/
    const updateDaysOff = (txtDays) => {
        //console.log("updateDaysOff() - txtDays:",txtDays );
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/daysOff/updateDaysOff/${authUserObject.userId}`, {
            daysOff:    txtDays,
        }).then(response => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }

    const newDaysOff = (txtDays) => {
        //console.log("newDaysOff() - txtDays:",txtDays );
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/daysOff/addDaysOff`, {
            doctorUID:  authUserObject.userId,
            daysOff:    txtDays,
        }).then(response => {
            //console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }

    /***************************************************** 
                    Functions
    ******************************************************/
    const setBoxDaysOff = (arrDaysGet) => {
        //console.log("setBoxDaysOff() - arrDaysGet:",arrDaysGet);
        if(arrDaysGet.includes("Monday")){
            setCheckedMon(true);
        }
        if(arrDaysGet.includes("Tuesday")){
            setCheckedTues(true);
        }
        if(arrDaysGet.includes("Wednesday")){
            setCheckedWed(true);
        }
        if(arrDaysGet.includes("Thursday")){
            setCheckedThurs(true);
        }
        if(arrDaysGet.includes("Friday")){
            setCheckedFri(true);
        }
        if(arrDaysGet.includes("Saturday")){
            setCheckedSat(true);
        }
        if(arrDaysGet.includes("Sunday")){
            setCheckedSun(true);
        }
    }

    const createValueToSend = ( newDay, doAdd )=> {
        //console.log("createValueToSend - newDay:",newDay," doAdd:",doAdd);
        let dayArray = [];

        if(checkedMon){dayArray.push("Monday");}
        if(checkedTues){dayArray.push("Tuesday");}
        if(checkedWed){dayArray.push("Wednesday");}
        if(checkedThurs){dayArray.push("Thursday");}
        if(checkedFri){dayArray.push("Friday");}
        if(checkedSat){dayArray.push("Saturday");}
        if(checkedSun){dayArray.push("Sunday");}
        //console.log("before -dayArray:",dayArray);


        if(doAdd){
            dayArray.push(newDay);
        } else {
            var index = dayArray.indexOf(newDay);
            if(index !== -1){
                dayArray.splice(index,1);
            }
        }
        //console.log("dayArray:",dayArray);

        //console.log("dayArray:",dayArray.join("|"));
        setListDaysOff(dayArray.join("|"));
        

    }

    const handleDayCBChange = (event) => {
        //console.log("handleDayCBChange() - event:",event);
        
        let targetName = event.target.name;
        let targetLabel = event.target.attributes.label.nodeValue;
        let arrDaysPush = arrDays;
        //console.log("handleDayCBChange() - targetName:",targetName,"targetLabel:",targetLabel,"arrDaysPush:",arrDaysPush);

        let doAdd = false;
        if (targetName === "boxMonday") {
            let bCheck = !checkedMon;
            setCheckedMon(bCheck);
            doAdd = bCheck;
            //console.log("Monday", bCheck);
        } else if (targetName === "boxTuesday") {
            let bCheck = !checkedTues;
            setCheckedTues(bCheck);
            doAdd = bCheck;
            //console.log("boxTuesday", bCheck);
        } else if (targetName === "boxWednesday") {
            let bCheck = !checkedWed;
            setCheckedWed(bCheck);
            doAdd = bCheck;
            //console.log("boxWednesday", bCheck);
        } else if (targetName === "boxThursday") {
            let bCheck = !checkedThurs;
            setCheckedThurs(bCheck);
            doAdd = bCheck;
            //console.log("boxThursday", bCheck);
        } else if (targetName === "boxFriday") {
            let bCheck = !checkedFri;
            setCheckedFri(bCheck);
            doAdd = bCheck;
            //console.log("boxFriday", bCheck);
        } else if (targetName === "boxSaturday") {
            let bCheck = !checkedSat;
            setCheckedSat(bCheck);
            doAdd = bCheck;
            //console.log("boxSaturday", bCheck);
        } else if (targetName === "boxSunday") {
            let bCheck = !checkedSun;
            setCheckedSun(bCheck);
            doAdd = bCheck;
            //console.log("boxSunday", bCheck);
        }

        //console.log("for createValueToSend - targetLabel:",targetLabel," doAdd: ",doAdd);
        createValueToSend(targetLabel, doAdd);
        
        
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
