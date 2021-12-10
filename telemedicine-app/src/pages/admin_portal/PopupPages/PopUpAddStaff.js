import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton';

const PopUpAddStaff = ( {trigger,setTrigger} ) => {
    //declarations
    const [txtStaffFName,setStaffFName] = React.useState("");
    const [txtStaffMName,setStaffMName] = React.useState("");
    const [txtStaffLName,setStaffLName] = React.useState("");
    const [txtStaffEmail,setStaffEmail] = React.useState("");
    const [txtStaffPass,setStaffPass] = React.useState("");
    const [txtFieldStudy,setFieldStudy] = React.useState("");
    const [txtlocationID,setLocationID] = React.useState("");
    const [listOfApprovedDocFamily, setlistOfApprovedDocFamily] = React.useState([]);  
    const [listOfLocations, setListOfLocations] = React.useState([]);  
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //List of Doctor Familes
    const listOfFamilies = [
        {
            label:  "Allergist",
            value:  "Allergist",
        },
        {
            label:  "Anesthesiologist",
            value:  "Anesthesiologist",
        },
        {
            label:  "Cardiologist",
            value:  "Cardiologist",
        },
        {
            label:  "Dermatologist",
            value:  "Dermatologist",
        },
        {
            label:  "Family Physician",
            value:  "Family Physician",
        },
        {
            label:  "Infectious Disease",
            value:  "Infectious Disease",
        },
        {
            label:  "Neurologist",
            value:  "Neurologist",
        },
        {
            label:  "Nurse",
            value:  "Nurse",
        },
        {
            label:  "Oncologist",
            value:  "Oncologist",
        },
        {
            label:  "Pathologist",
            value:  "Pathologist",
        },
        {
            label:  "Pediatrician",
            value:  "Pediatrician",
        },
        {
            label:  "Physiatrist",
            value:  "Physiatrist",
        },
        {
            label:  "Radiologist",
            value:  "Radiologist",
        },
        {
            label:  "Receptionist",
            value:  "Receptionist",
        },
    ];
    
    /***************************************************** 
                    Event Handlers
    ******************************************************/
    //On open
    useEffect(() => {
        CreateListOfLocations();
    }, []);

    // Create Staff
    const onSubmit = ( event ) => {
        //console.log(event);
        //console.log("Add Staff, onSubmit()");        
        
        if (txtStaffFName == "" || txtStaffMName == "" ||
         txtStaffLName == "" || txtStaffEmail == "" || txtStaffPass == "" || txtFieldStudy == "") {
            setBoolError(true);
            setError("Please Fill out all the above Information.");
        }else{    
            addRegister();            
        }
    }

    const fieldSelect = ( event ) => {
        //console.log("fieldOfStudy: ",event.target.value);
        setFieldStudy(event.target.value);
    }
    
    const locationSelect = ( event ) => {
        //console.log("location ID: ",event.target.value);
        setLocationID(event.target.value);
    }

    const CreateListOfLocations = (  ) => {
        setListOfLocations([]);
        Axios.get('https://telemedicine5a-backend.herokuapp.com/location/getLocations')        
            .then((response) => {                
                let data = response.data;           
                //console.log("CreateListOfLocations() - response:",data);
                data.forEach(e=>{setListOfLocations(listOfLocations => [...listOfLocations, {
                    label: e.address1+", "+e.zip,
                    value: e._id,
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    //Register
    const addRegister = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/users/register', {
                name:       txtStaffLName +", " + txtStaffFName, 
                email:      txtStaffEmail,        
                password:   txtStaffPass,
                role:       1,
            }).then((response) => {
                //console.log("Add Patient, onSubmit(), CreateUser, Axios response: ",response)
                let userID = String(response.data.user._id);
                //console.log("userID: ",userID);
                addDemo(userID);
            }).catch((err) => {
                let arrErrors = err.response.data.errors;
                //console.log("arrErrors: ",arrErrors);
                let txtError = "";
                arrErrors.forEach(e => txtError=`${txtError}${e.msg}. `);
                //console.log("txtError: ",txtError);

                setError(txtError);
                setBoolError(true);
            });
    }

    //Create Demo Info
    const addDemo = ( userID ) => {
        return Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/createUserProfile/${userID}`, {
            firstName:          txtStaffFName,
            midName:            txtStaffMName,
            lastName:           txtStaffLName,
            email:              txtStaffEmail,                    
            isAdmin:            true,
        }).then((response) => {
            //console.log("Add Patient, onSubmit(), CreateDemo, Axios response: ",response);
            addDoctorInfo(userID);
        }).catch((err) => {
            console.log(err);
            setError("Unable to add Demo");
            setBoolError(true);
        });
    }

    //Create Doctor Demo
    const addDoctorInfo = ( userID ) => {
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/doctors/addDoctorInfo`, {
            doctorUID:          userID,
            fieldOfStudy:       txtFieldStudy,                        
            locationUID:        txtlocationID,                        
        }).then((response) => {
            //console.log("Add Staff, onSubmit(), Create Doc, Axios response: ",response);
            
        }).catch((err) => {
            console.log(err);
            setError("Unable to create Doctor Field.");
            setBoolError(true);
        });

        //Cleanup
        setBoolError(false);
        setError("");
        setStaffFName("");
        setStaffMName("");
        setStaffLName("");
        setStaffEmail("");
        setStaffPass("");
        setFieldStudy("");
        setTrigger(false);
    }
    
    /***************************************************** 
                         HTML
    ******************************************************/

    return (
    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Staff"
        >    
            {/* Grid */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "35px 35px 35px 35px 35px 35px 50px",
                    gridTemplateColumns: "130px 325px",
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
                        value={txtStaffFName}
                        onChange={e=>setStaffFName(e.target.value)}
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
                        value={txtStaffMName}
                        onChange={e=>setStaffMName(e.target.value)}
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
                        value={txtStaffLName}
                        onChange={e=>setStaffLName(e.target.value)}
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
                        value={txtStaffEmail}
                        onChange={e=>setStaffEmail(e.target.value)}
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
                        value={txtStaffPass}
                        onChange={e=>setStaffPass(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Location */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:6,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Location:</h5>
                </div>
                <div className="popup_spread_grid"
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
                        
                        onChange={e=>locationSelect(e)}  
                    >
                        <option key="puas_location_placeholder" value="_placeholder_">Select Location</option>
                        {listOfLocations.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
    
                    </select>                   
                </div>

                {/* Field of Study */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:7,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Field of Study:</h5>
                </div>
                <div className="popup_spread_grid"
                    style={{
                        gridRow:7,                        
                        gridColumn:2,          
                    }}
                >     
                    <select
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                        
                        onChange={e=>fieldSelect(e)}  
                    >
                        <option key="puas_field_placeholder" value="_placeholder_">Select Field</option>
                        {listOfFamilies.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
    
                    </select>                   
                </div>
                
                
                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:8,
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

export default PopUpAddStaff
