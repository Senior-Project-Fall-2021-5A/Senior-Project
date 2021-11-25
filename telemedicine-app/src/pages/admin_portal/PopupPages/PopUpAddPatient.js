import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpAddPatient = ( {trigger,setTrigger} ) => {
    //declarations
    const [txtPatientFName,setPatientFName] = React.useState("");
    const [txtPatientMName,setPatientMName] = React.useState("");
    const [txtPatientLName,setPatientLName] = React.useState("");
    const [txtPatientEmail,setPatientEmail] = React.useState("");
    const [txtPatientPass,setPatientPass] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");

    /***************************************************** 
            Temp Needs Link to get actual list of docs
    ******************************************************/
    const listOfDoctors =[
        {
            label: "Doctor1",
            value: "00001",
        },
        {
            label: "Doctor2",
            value: "00002",
        },
        {
            label: "Doctor3",
            value: "00003",
        },
        {
            label: "Doctor4",
            value: "00004",
        },
    ];

    /***************************************************** 
                    Event Handlers
    ******************************************************/
    //Doctor Select
    const onDoctorSelect = ( event ) => {
        console.log("onDoctorSelect - ",event);
        console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }
    
    // Create Patient
    const onSubmit = ( event ) => {
        console.log(event);
        console.log("idk yet");        
        setTrigger(false);
    }
    
    return (
    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Patient"
        >    
            {/* Grid */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "35px 35px 35px 35px 35px 35px 50px",
                    gridTemplateColumns: "125px 325px",
                }}
            >
                {/* First Name */}
                <div className="popup_label_grid"
                    style={{                        
                        gridRow:1,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">First Name:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:1,
                        gridColumn:2,
                    }}
                >    
                    <input
                        type="text"
                        value={txtPatientFName}
                        onChange={e=>setPatientFName(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Middle Name */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:2,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Middle Name:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:2,
                        gridColumn:2,
                    }}
                >    
                    <input
                        type="text"
                        value={txtPatientMName}
                        onChange={e=>setPatientMName(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Last Name */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:3,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Last Name:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:3,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtPatientLName}
                        onChange={e=>setPatientLName(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Email */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:4,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Email:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:4,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtPatientEmail}
                        onChange={e=>setPatientEmail(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Password */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:5,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Password:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:5,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtPatientPass}
                        onChange={e=>setPatientPass(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Doctor Select */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:6,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Doctor:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:6,
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
                        {listOfDoctors.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}

                    </select>
                </div>
                
                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:7,
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
        </PopUpWindow>
        
    )
}

export default PopUpAddPatient
