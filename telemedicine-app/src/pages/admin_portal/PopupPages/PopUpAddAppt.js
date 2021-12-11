import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import authUserObject from '../../../middleware/authUserObject';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'


const PopUpAddAppt = ( { trigger, setTrigger, newPatientPopup, newStaffPopup} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");
    const [listOfPatients,setListOfPatients] = React.useState([]);  
    const [listOfDoctors,setListOfDoctors] = React.useState([]);
    const [listOfLocations,setListOfLocations] = React.useState([]);
    const [listTimesSelect,setlistTimesSelect] = React.useState([]);
    const [dateReal,setDate] = React.useState(new Date());
    const [txtDate,setTxtDate] = React.useState("");
    const [textTime,setTime] = React.useState("");
    const [txtLocSelect,setLocSelect] = React.useState("");
    const [boolShowLocation,setShowLocation] = React.useState(false);
    const [txtLocation,setLocation] = React.useState("6179e7aba30ceaeeec949c21");
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //Time Defaults
    const listOfTimes =[
        {
            label: "09:00 am",
            value: "09:00 am",
        },   
        {
            label: "09:30 am",
            value: "09:30 am",
        },     
        {
            label: "10:00 am",
            value: "10:00 am",
        },
        {
            label: "10:30 am",
            value: "10:30 am",
        },
        {
            label: "11:00 am",
            value: "11:00 am",
        },
        {
            label: "11:30 am",
            value: "11:30 am",
        },
        {
            label: "12:00 pm",
            value: "12:00 pm",
        },
        {
            label: "12:30 pm",
            value: "12:30 pm",
        },
        {
            label: "01:00 pm",
            value: "01:00 pm",
        },
        {
            label: "01:30 pm",
            value: "01:30 pm",
        },
        {
            label: "02:00 pm",
            value: "02:00 pm",
        },
        {
            label: "02:30 pm",
            value: "02:30 pm",
        },
        {
            label: "03:00 pm",
            value: "03:00 pm",
        },
        {
            label: "03:30 pm",
            value: "03:30 pm",
        },
        {
            label: "04:00 pm",
            value: "04:00 pm",
        },
        {
            label: "04:30 pm",
            value: "04:30 pm",
        },
    ];

    /******************************************************************
                    Handlers
    ******************************************************************/

    //Load Patients and Doctors
    useEffect(() => {
        CreateListOfPatients();
    }, [newPatientPopup]);

    useEffect(() => {
        CreateListOfDoctors();
    }, [newStaffPopup]);

    useEffect(() => {        
        //get Appts
        //console.log("useEffect[trigger] - textDoctorID:",textDoctorID," txtDate: ",txtDate);
        getListDaysOff(textDoctorID,txtDate, dateReal);

    }, [trigger]);

    useEffect(() => {
        onDateSelect(new Date());
        getLocations();  
    }, []);

    /******************************************************************
                    Axios Gets
    ******************************************************************/

    const CreateListOfPatients = (  ) => {
        setListOfPatients([]);
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getPatients')        
            .then((response) => {                
                let data = response.data;           
                //console.log("response:",data);
                data.forEach(e=>{setListOfPatients(listOfPatients => [...listOfPatients, {
                    label: e.lastName+", "+e.firstName+" ["+e.userUID.slice(-4)+"]",
                    value: e.userUID,
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    const CreateListOfDoctors = (  ) => {
        setListOfDoctors([]);
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
            .then((response) => {                
                let data = response.data;           
                //console.log("response:",data);
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.lastName+", "+e.firstName+" ["+e.userUID.slice(-4)+"]",
                    value: e.userUID,
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    const getListDaysOff = ( docID, date, rDate ) => {
        //console.log("getListDaysOff() - starting docID, date, rDate",docID, date, rDate);
        let data = [];
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/daysOff/getDaysOff/${docID}`)
            .then((response) => {   
                //console.log("getListDaysOff() - response:",response);             
                data = response.data[0];           
                //console.log("getListDaysOff data:",data);
                if(data){
                    let arrDaysGet = data.daysOff.split("|");
                    

                    let day = convertDay(rDate.getDay());
                    //console.log("dateReal:",rDate,"day: ",day);
                    
                    if (arrDaysGet.includes(day)){
                        //console.log("Day Off");
                        setlistTimesSelect([]);
                    } else {
                        getAppointments( docID, date );
                    }
                } else {
                    getAppointments( docID, date );
                }
            }).catch((err) => {
                console.log(err, "Unable to get doctors/getDoctorInfo");
            });
    }

    const getAppointments = ( docID, date ) => {
        //console.log("getAppointments - textDoctorID:",docID," txtDate: ",date);
        if(docID.length >0 && date.length>0){
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointmentsByDate/${docID}/${date}`)
                .then((response) => {
                    //console.log('getAppointments - response:', response)
                    let arrData = response.data;            
                    //console.log("arrData: ",arrData);
                    if(Array.isArray(arrData)){
                        adjustTimeDT(arrData);
                    } else {
                        setlistTimesSelect(listOfTimes);
                    }
                })
                .catch((err) => {
                    console.log(err, "Unable to get appointments for selected date");
                });
        } else {
            setlistTimesSelect([]);
        }       
    }

    const getLocations = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocations`)
            .then((response) => {                
                let data = response.data;           
                //console.log("getLocations() - response:",data);
                data.forEach(e=>{setListOfLocations(listOfLocations=>[...listOfLocations,{
                        label: e.name,
                        value: e._id,
                    }]
                )})
            }).catch((err) => {
                console.log(err, "Unable to get Locations");
            });
    }

    /******************************************************************
                    Axios Post
    ******************************************************************/

    //Create Apt
    const addAppointment = () => {
        /* console.log("Final Add Apt -  textPatientID: ",textPatientID," textDoctorID: ",textDoctorID, " txtDate: ",txtDate,
            " textTime: ",textTime, " txtLocSelect: ",txtLocSelect," txtLocation: ",txtLocation); */
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {
                userUID:        textPatientID,
                doctorUID:      textDoctorID,
                date:           txtDate,
                time:           textTime,
                type:           txtLocSelect,
                locationUID:    txtLocation,
            }).then((response) => {
                //console.log("Add Appt, addAppointment(), response: ",response) 
                
                //cleanup
                setBoolError(false);
                setDoctorID("");
                setPatientID("");
                setLocation("6179e7aba30ceaeeec949c21");
                setLocSelect("");                
                onDateSelect(new Date());
                setTime("");
                setTrigger(false);
            }).catch((err) => {
                //get Error
                //console.log("Org Error: ",err);

                //error display
                setError("Unable to add Appointment");
                setBoolError(true);            
            });
    }

    /******************************************************************
                    Functions
    ******************************************************************/
    const convertDay = ( nDay ) => {
        switch (nDay){
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }
    
    const findTime = (e,v) => e.label == v;

    //Time Select
    const adjustTimeDT = ( arrAppt ) => {
        //console.log("arrAppt:",arrAppt);
        //make new list
        var newArray = JSON.parse(JSON.stringify(listOfTimes));

        //go through list remove any in arrApt
        arrAppt.forEach(e=> {
            var index = newArray.findIndex(ele=>findTime(ele,e.time));
            //console.log("index:",index);
            if(index >= 0){
                newArray.splice(index,1);
            }
        });

        setlistTimesSelect(newArray);
    }

    //set patient
    const onPatientSelect = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    //set Doctor
    const onDoctorSelect = ( event ) => {
        //console.log("onDoctorSelect - ",event);
        let docID = event.target.value;
        //console.log("Value set: ", docID);
        setDoctorID(docID);  
        getListDaysOff(docID, txtDate, dateReal);       
    }

    //Set Type of Visit    
    const onRadioLocSelect = ( event ) => {
        let loc = event.target.value;
        setLocSelect(loc);
        //console.log("Radio Loc Select: ",loc);
        let doInPerson = loc == "inPerson";
        setShowLocation(doInPerson);
    }

    //set Location
    const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
        //console.log("Location: ",loc);
        
    }

    //date select
    const onDateSelect = ( event ) => {
        setDate(event);
        //convert date to string
        let dt = event.toLocaleDateString("en-US").split('/').join('-');
        setTxtDate(dt);
        //console.log("Date: ",event," txtDate: ",event.toLocaleDateString("en-US").split('/').join('-'));
        getListDaysOff(textDoctorID, dt, event);   
    }

    //set Time
    const onTimeSelect = ( event ) => {
        //console.log("onTimeSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setTime(event.target.value);
    }

    //Submit Apt
    const onSubmit = (event) => {
        //console.log(event);
        //console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " Date: ", date, " Time: ", textTime); 

        if (textPatientID == "_placeholder_" || textDoctorID == "_placeholder_" || textPatientID == "" || 
        textDoctorID == "" || textTime == "_placeholder_" || textTime == "" || txtLocSelect == "") {
            setBoolError(true);
            setError("Missing Patient, Doctor, Location, or Time");
        }else{            
            addAppointment();
        }
    }

    
    
    return (    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Appointment"
        >  
            {/* Grid Definitions */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "inherit",
                    gridTemplateColumns: "100px 325px",
                }}
            >
                
                {/* Patient Label */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:1,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Patient:</h5>
                </div>

                {/* Patient Select */}
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:1,
                        gridColumn:2,
                    }}
                >
                    <select
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                        
                        onChange={e=>onPatientSelect(e)}  
                    >
                        <option key="puaa_patient_placeholder" value="_placeholder_">Select Patient</option>
                        {listOfPatients.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
    
                    </select>
                </div>

                {/* Doctor Label */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:2,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Doctor:</h5>
                </div>

                {/* Doctor Select */}
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:2,
                        gridColumn:2,
                    }}
                >
                    <select
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                        
                        onChange={e=>onDoctorSelect(e)}  
                    >
                        <option key="puaa_doctor_placeholder" value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}        
                    </select>
                </div>
            
                {/* Date and Time Select */}
                <div className="popup_spread_grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gridRow:3,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                        justifyContent: "center",
                        position: 'relative', 
                    }}
                >
                    {/* Date Select */}
                    <div>
                        <DatePicker                            
                            selected={dateReal}
                            onChange={e=>onDateSelect(e)}
                        />
                    </div>

                    {/* spacer */}
                    <pre>     </pre>
                    
                    {/* Time Select */}
                    <select
                        style={{
                            height: "25px",
                            width: "100px",
                            textAlign: "left",
                        }}                        
                        onChange={e=>onTimeSelect(e)}  
                    >
                        <option key="puaa_time_placeholder" value="_placeholder_">Time</option>
                        {listTimesSelect.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}    
                    </select>
                </div>

                {/* Radio Type of Visit Select */}
                <div className="popup_spread_grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gridRow:4,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                        justifyContent: "center",
                        position: 'relative', 
                        top: "-10px"
                    }}
                    onChange={e=>onRadioLocSelect(e)}
                >
                    {/* Btn In Person */}
                    <input
                        type="radio"
                        value="inPerson"
                        name="radioLocation"                        
                    />
                    <pre><p 
                        style={{
                            position:"relative",
                            top: "16px"
                        }}
                    > In Person Visit     </p></pre>
                    
                    {/* Btn Virtual */}
                    <input
                        type="radio"
                        value="virtual"
                        name="radioLocation"
                    />
                    <pre><p 
                        style={{
                            position:"relative",
                            top: "16px"
                        }}
                    > Virtual Visit</p></pre>                    
                </div>
            
                {/* Location Label */}
                {boolShowLocation == true &&
                    <div className="popup_label_grid"
                        style={{
                            gridRow:5,
                            gridColumn:1,
                        }}
                    >
                        <h5 className="popup_label">Location:</h5>
                    </div>
                } 
                

                {/* Location Select */}
                {boolShowLocation == true &&
                    <div className="popup_inputs_grid"
                        style={{
                            gridRow:5,
                            gridColumn:2,
                        }}
                    >
                        <select
                            style={{
                                height: "25px",
                                width: "300px",
                                textAlign: "left",
                            }}
                            
                            onChange={e=>onLocationInput(e)}  
                        >
                            {listOfLocations.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}        
                        </select>
                    </div>
                }
                

                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:6,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                    }}
                >
                    <ObjButton                     
                        text="Create"
                        onClick={e=>onSubmit(e)}
                    />
                </div>                
            </div>

            {/* Button Error Message */}
            {boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                >{txtError}</p>
            } 
        </PopUpWindow>
    )
}

export default PopUpAddAppt
