import React from 'react';
import { UseState, useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton';
import "react-datepicker/dist/react-datepicker.css";

const PopUpAddPatient = ( {trigger,setTrigger} ) => {
    //declarations
    const [txtPatientFName,setPatientFName] = React.useState("");
    const [txtPatientMName,setPatientMName] = React.useState("");
    const [txtPatientLName,setPatientLName] = React.useState("");
    const [txtPatientEmail,setPatientEmail] = React.useState("");
    const [txtPatientPass,setPatientPass] = React.useState("");    
    const [listOfDoctors, setListOfDoctors] = React.useState([]);
    const [textDoctorID,setDoctorID] = React.useState("");
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    /***************************************************** 
                    Pull List of Docs
    ******************************************************/
    //http://localhost:3003/doctors/getDoctorInfo
    
    useEffect(() => {
        setListOfDoctors([]);
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')        
            .then((response) => {     
                let data = response.data;           
                //console.log("response:",data);
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.lastName+", "+e.firstName+" ["+e.userUID.slice(-4)+"]",
                    value: e.userUID,
                    },]
                )});
                
            })
            .catch((err) => {
                console.log(err, "Unable to get Doctors");
            });
    }, []);

    /***************************************************** 
                    Event Handlers
    ******************************************************/
    //Doctor Select
    const onDoctorSelect = ( event ) => {
        //console.log("onDoctorSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }
    
    // Create Patient
    const onSubmit = ( event ) => {
        //console.log(event);
        //console.log("Add Patient, onSubmit()"); 
        
        //
        if (textDoctorID == "_placeholder_" || textDoctorID == "" || txtPatientFName == "" || txtPatientMName == "" ||
         txtPatientLName == "" || txtPatientEmail == "" || txtPatientPass == "") {
            setBoolError(true);
            setError("Please Fill out all the above Information.");
        }else{            
            Axios.post('https://telemedicine5a-backend.herokuapp.com/users/register', {
                name:       txtPatientLName +", " + txtPatientFName, 
                email:      txtPatientEmail,        
                password:   txtPatientPass,
                role:       0,
            }).then((response) => {
                //console.log("Add Patient, onSubmit(), CreateUser, Axios response: ",response)
                let patientID = String(response.data.user._id);
                //console.log("PatientID: ",patientID)
                
                return Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/createUserProfile/${patientID}`, {
                    firstName:          txtPatientFName,
                    midName:            txtPatientMName,
                    lastName:           txtPatientLName,
                    email:              txtPatientEmail,
                    primaryPhysician:   textDoctorID,
                    isAdmin:            false,
                }).then((response) => {
                    //console.log("Add Patient, onSubmit(), CreateDemo, Axios response: ",response)                
                }).catch((err) => {
                    console.log(err)
                });
            });

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

    /***************************************************** 
                         HTML
    ******************************************************/

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
                        <option key="puap_doctor_placeholder" value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
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

export default PopUpAddPatient
