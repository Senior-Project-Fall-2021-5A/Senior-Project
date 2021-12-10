import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpEditPatient = ( {trigger,setTrigger} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");    
    const [listOfPatients,setListOfPatients] = React.useState([]);    
    const [textDoctorID,setDoctorID] = React.useState("");
    const [textDoctorName,setDoctorName] = React.useState("");
    const [listOfDoctors,setListOfDoctors] = React.useState([]);
    const [listOfDoctorFamily,setListOfDoctorFamily] = React.useState([]);
    const [listOfApprovedDocFamily, setlistOfApprovedDocFamily] = React.useState([]);
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    /***************************************************** 
                    Create List from Backend
    ******************************************************/
    //Load Patients and Doctors
    useEffect(() => {
        CreateListOfPatients();
    }, []);
    
    useEffect(() => {        
        CreateListOfDoctors();    
    }, []);

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

    const CreateListOfPatientDocFamily = ( userID ) => {
        //console.log("CreateListOfPatientDocFamily() - userID: ",userID);
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${userID}`)        
            .then((response) => {                
                let data = response.data[0].approvedDoctors;           
                //console.log("CreateListOfPatientDocFamily - response:",data);
                data.forEach(e=>{setlistOfApprovedDocFamily(listOfApprovedDocFamily=> [...listOfApprovedDocFamily, {
                    label:  e,
                    value:  e,
                    }]
                )});                 
            }).catch((err) => {
                console.log(err, "Unable to get Patients list of Doctors");
            });
    }

    const setPatientsPCPDoctor = ( userID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getPatientPcp/${userID}`)        
            .then((response) => {                
                let docID = response.data[0].primaryPhysician;           
                //console.log("setPatientsPCPDoctor - response:",docID);

                if (docID) {
                    setDoctorWithID(docID);                    
                } else {
                    setDoctorName("Select Doctor");
                    setDoctorID("_placeholder_");
                }               
            }).catch((err) => {
                console.log(err, "Unable to get Patients list of Doctors");
            });
    }

    const setDoctorWithID = ( docID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${docID}`)        
            .then((response) => {                
                let docData = response.data[0];           
                //console.log("setDoctorWithID - response:",docData);

                let value = docData.userUID;
                var index = listOfDoctors.findIndex(arr=> arr.value === value);
                if (index === -1){
                    //console.log("could not find doctor");
                } else {
                    let label = listOfDoctors[index].label;
                    setDoctorName(listOfDoctors[index].label);
                    setDoctorID(listOfDoctors[index].value);
                }
            }).catch((err) => {
                console.log(err, "Unable to get Patients list of Doctors");
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

    //set patient
    const OnPatientSelect = ( event ) => {
        //console.log("OnPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        
        let userId = event.target.value;
        setPatientID(userId);

        setPatientsPCPDoctor(userId);
        CreateListOfPatientDocFamily(userId);
    }
    
    //set Doctor
    const onDoctorSelect = ( event ) => {
        //console.log("onDoctorSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }

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
    ];

    //Sets Doctor Family List
    const updateDocFamList = ( event ) => {
       //console.log(event);
       setlistOfApprovedDocFamily(event);       
    }
    
    //Edit Patient
    const onSubmit = (event) => {
        //console.log(event);
        //console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " docFamily: ", listOfApprovedDocFamily);        

        if (textPatientID == "_placeholder_" || textDoctorID == "_placeholder_" || textPatientID == "" || textDoctorID == "" ) {
            setBoolError(true);
            setError("Missing Patient or Doctor");
        }else{            
            postPatientInfoUpdate(textPatientID)
        }
    }

    const postPatientInfoUpdate = ( textPatientID ) => {
        let docList = [];
        listOfApprovedDocFamily.forEach(e=>{docList=[...docList,e.label]});
        //console.log("postPatientInfoUpdate: ",docList);
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/updateUserInfo/${textPatientID}`, {
            primaryPhysician:   textDoctorID,
            approvedDoctors:    docList,            
        }).then((response) => {
            //console.log("Edit Patient, postPatientInfoUpdate(), response: ",response);
            
            //cleanup
            setBoolError(false);
            setDoctorID("");
            setPatientID("");
            setlistOfApprovedDocFamily([]);
            setTrigger(false);
        }).catch((err) => {
            console.log(err);
            setError("Unable to add postPatientInfoUpdate()");
            setBoolError(true);
        });
    }
    
    return (        
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Edit Patient"
        >  
            {/* Grid Definitions */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "inherit",
                    gridTemplateColumns: "115px 325px",
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
                        placeholder="select patient"
                        onChange={e=>OnPatientSelect(e)}  
                    >
                        <option key="puep_patient_placeholder" value="_placeholder_">Select Patient</option>
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
                    <h5 className="popup_label">PCP Doctor:</h5>
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
                        value={textDoctorID}
                        label={textDoctorName}
                        onChange={e=>onDoctorSelect(e)}  
                    >
                        <option key="puep_doctor_placeholder" value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}        
                    </select>
                </div>
            
                {/* Doctor Family Table */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:3,                        
                        gridColumnStart:1,
                        gridColumnEnd:3,                       
                    }}
                >     
                   <h5 className="popup_label">Doctor Family:</h5>
                </div>
                <div className="popup_spread_grid"
                    style={{
                        gridRow:4,                        
                        gridColumnStart:1,
                        gridColumnEnd:3,                        
                    }}
                >     
                   <Select
                        isMulti
                        name="docFam"
                        options={listOfFamilies}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={listOfApprovedDocFamily}
                        onChange={e=>updateDocFamList(e)}
                   />
                </div>

                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:5,
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

export default PopUpEditPatient
