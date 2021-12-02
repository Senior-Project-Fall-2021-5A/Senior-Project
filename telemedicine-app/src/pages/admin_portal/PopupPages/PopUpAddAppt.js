import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpAddAppt = ( {trigger,setTrigger} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");
    const [listOfPatients,setListOfPatients] = React.useState([]);  
    const [listOfDoctors,setListOfDoctors] = React.useState([]);
    const [listOfLocations,setListOfLocations] = React.useState([]);
    const [date,setDate] = React.useState(new Date());
    const [textTime,setTime] = React.useState("");
    const [txtLocSelect,setLocSelect] = React.useState("");
    const [boolShowLocation,setShowLocation] = React.useState(false);
    const [txtLocation,setLocation] = React.useState("");
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //Time Defaults
    const listOfTimes =[
        {
            label: "09:00AM",
            value: "09:00AM",
        },   
        {
            label: "09:30PM",
            value: "09:30PM",
        },     
        {
            label: "10:00AM",
            value: "10:00AM",
        },
        {
            label: "10:30AM",
            value: "10:30AM",
        },
        {
            label: "11:00AM",
            value: "11:00AM",
        },
        {
            label: "11:30AM",
            value: "11:30AM",
        },
        {
            label: "12:00PM",
            value: "12:00PM",
        },
        {
            label: "12:30PM",
            value: "12:30PM",
        },
        {
            label: "01:00PM",
            value: "01:00PM",
        },
        {
            label: "01:30PM",
            value: "01:30PM",
        },
        {
            label: "02:00PM",
            value: "02:00PM",
        },
        {
            label: "02:30PM",
            value: "02:30PM",
        },
        {
            label: "03:00PM",
            value: "03:00PM",
        },
        {
            label: "03:30PM",
            value: "03:30PM",
        },
        {
            label: "04:00PM",
            value: "04:00PM",
        },
        {
            label: "04:30PM",
            value: "04:30PM",
        },
    ];

    //Load Patients and Doctors
    useEffect(() => {
        CreateListOfPatients();
        CreateListOfDoctors();  
        getLocations();  
    }, []);

    const CreateListOfPatients = (  ) => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getPatients')        
            .then((response) => {                
                let data = response.data;           
                console.log("response:",data);
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
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
            .then((response) => {                
                let data = response.data;           
                console.log("response:",data);
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.lastName+", "+e.firstName+" ["+e.userUID.slice(-4)+"]",
                    value: e.userUID,
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    //set patient
    const onPatientSelect = ( event ) => {
        console.log("onPatientSelect - ",event);
        console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    //set Doctor
    const onDoctorSelect = ( event ) => {
        console.log("onDoctorSelect - ",event);
        let docID = event.target.value;
        console.log("Value set: ", docID);
        setDoctorID(docID);
        getScheduleAvail(docID);
    }

    const getScheduleAvail = ( docID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/schedule/getScheduled/${docID}`)
            .then((response) => {                
                let data = response.data;           
                console.log("getScheduleAvail() - response:",data);
                
            }).catch((err) => {
                console.log(err, "Unable to get Schedule");
            });
    }

    //set Time
    const onTimeSelect = ( event ) => {
        console.log("onTimeSelect - ",event);
        console.log("Value set: ", event.target.value);
        setTime(event.target.value);
    }

    //Set Type of Visit    
    const onRadioLocSelect = ( event ) => {
        let loc = event.target.value;
        setLocSelect(loc);
        console.log("Radio Loc Select: ",loc);
        let doInPerson = loc == "InPerson";
        setShowLocation(doInPerson);
    }
    
    const getLocations = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocations`)
            .then((response) => {                
                let data = response.data;           
                console.log("getLocations() - response:",data);
                data.forEach(e=>{setListOfLocations(listOfLocations=>[...listOfLocations,{
                        label: e.name,
                        value: e._id,
                    }]
                )})
            }).catch((err) => {
                console.log(err, "Unable to get Locations");
            });
    }

    //set Location
    const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
        console.log("Location: ",loc);
        
    }

    //Submit Apt
    const onSubmit = (event) => {
        console.log(event);
        console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " Date: ", date, " Time: ", textTime);        
        
        if (textPatientID == "_placeholder_" || textDoctorID == "_placeholder_" || textPatientID == "" || 
        textDoctorID == "" || textTime == "_placeholder_" || textTime == "" || txtLocSelect == "") {
            setBoolError(true);
            setError("Missing Patient, Doctor, Location, or Time");
        }else{            
            addAppointment();
        }
    }

    //Create Apt
    const addAppointment = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {
                userUID:        textPatientID,
                doctorUID:      textDoctorID,
                date:           date,
                time:           textTime,
                type:           txtLocSelect,
                locationUID:    txtLocation,
            }).then((response) => {
                console.log("Add Appt, addAppointment(), response: ",response) 
                
                //cleanup
                setBoolError(false);
                setDoctorID("");
                setPatientID("");
                setLocSelect("");
                setTime("");
                setTrigger(false);
            }).catch((err) => {
                //get Error
                let arrErrors = err.response.data.errors;
                console.log("arrErrors: ",arrErrors);
                let txtError = "";
                arrErrors.forEach(e => txtError=`${txtError}${e.msg}. `);
                console.log("txtError: ",txtError);

                //error display
                setError(txtError);
                setBoolError(true);            
            });
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
                        <option value="_placeholder_">Select Patient</option>
                        {listOfPatients.map((option) => (
                            <option value={option.value}>{option.label}</option>
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
                        <option value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option value={option.value}>{option.label}</option>
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
                            selected={date}
                            onChange={e=>setDate(e)}
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
                        <option value="_placeholder_">Time</option>
                        {listOfTimes.map((option) => (
                            <option value={option.value}>{option.label}</option>
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
                                <option value={option.value}>{option.label}</option>
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
