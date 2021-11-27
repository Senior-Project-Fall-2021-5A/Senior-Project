import React from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const multiSelectStyle = {

}

const PopUpEditPatient = ( {trigger,setTrigger} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");
    const [listOfApprovedDocFamily, setlistOfApprovedDocFamily] = React.useState([]);
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");


    
    //~~~~~~Remove when linked~~~~~
    const listOfPatients =[
        {
            label: "patient1",
            value: "00001",
        },
        {
            label: "patient2",
            value: "00002",
        },
        {
            label: "patient3",
            value: "00003",
        },
        {
            label: "patient4",
            value: "00004",
        },
    ];

    //set patient
    const onPatientSelect = ( event ) => {
        console.log("onPatientSelect - ",event);
        console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    //~~~~~~Remove when linked~~~~~
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

    //set Doctor
    const onDoctorSelect = ( event ) => {
        console.log("onDoctorSelect - ",event);
        console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }

    //List of Doctor Familes
    const listOfFamilies = [
        {
            label:  "Allergist",
            value:  "allergist",
        },
        {
            label:  "Anesthesiologist",
            value:  "anesthesiologist",
        },
        {
            label:  "Cardiologist",
            value:  "cardiologist",
        },
        {
            label:  "Dermatologist",
            value:  "dermatologist",
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
            value:  "neurologist",
        },
        {
            label:  "Oncologist",
            value:  "oncologist",
        },
        {
            label:  "Pathologist",
            value:  "pathologist",
        },
        {
            label:  "Pediatrician",
            value:  "pediatrician",
        },
        {
            label:  "Physiatrist",
            value:  "physiatrist",
        },
        {
            label:  "Radiologist",
            value:  "radiologist",
        },
    ];

    //Sets Doctor Family List
    const updateDocFamList = ( event ) => {
       console.log(event);
       setlistOfApprovedDocFamily(event);       
    }
    
    //Edit Patient
    const onSubmit = (event) => {
        console.log(event);
        console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " docFamily: ", listOfApprovedDocFamily);        

        if (textPatientID == "_placeholder_" || textDoctorID == "_placeholder_" || textPatientID == "" || textDoctorID == "" ) {
            setBoolError(true);
            setError("Missing Patient or Doctor");
        }else{            
            setBoolError(false);
            setDoctorID("");
            setPatientID("");
            setTrigger(false);
        }
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
                        
                        onChange={e=>onDoctorSelect(e)}  
                    >
                        <option value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option value={option.value}>{option.label}</option>
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
