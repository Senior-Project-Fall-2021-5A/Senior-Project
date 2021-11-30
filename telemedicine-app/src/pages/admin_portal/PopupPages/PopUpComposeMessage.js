import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpComposeMessage = ( {trigger,setTrigger} ) => {
    //declarations
    const [txtPatientFName,setPatientFName] = React.useState("");
    const [txtPatientMName,setPatientMName] = React.useState("");
    const [txtPatientLName,setPatientLName] = React.useState("");
    const [txtPatientEmail,setPatientEmail] = React.useState("");
    const [txtPatientPass,setPatientPass] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

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
        
        if (textDoctorID == "_placeholder_" || textDoctorID == "" || txtPatientFName == "" || txtPatientMName == "" ||
         txtPatientLName == "" || txtPatientEmail == "" || txtPatientPass == "") {
            setBoolError(true);
            setError("Please Fill out all the above Information.");
        }else{            
            setBoolError(false);
            setDoctorID("");
            setPatientFName("");
            setPatientMName("");
            setPatientLName("");
            setPatientEmail("");
            setPatientPass("");
            setTrigger(false);
        }
    }
    
    return (
    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Compose Message"
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
                {/* Doctor Select */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:1,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Doctor:</h5>
                </div>
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
                        onChange={e=>onDoctorSelect(e)}  
                    >
                        <option value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}

                    </select>
                </div>

                {/* Middle Name */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:2,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Message:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:2,
                        gridColumn:2,
                    }}
                >    
                    <textarea
                        type="text"
                        value={txtPatientMName}
                        onChange={e=>setPatientMName(e.target.value)}
                        style={{
                            height: "175px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
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
                        
                        text="Send"
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

export default PopUpComposeMessage