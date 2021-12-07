import React from 'react'
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpApptSelect = ( {trigger,setTrigger} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");
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
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }
    
    //View All Appointments
    const onSubmit = (event) => {
        //console.log(event);
        //console.log("patient: ", textPatientID);        
        
        if (textPatientID == "_placeholder_" || textPatientID == "") {
            setBoolError(true);
            setError("Please Select a Patient");
        }else{            
            setBoolError(false);
            setPatientID("");            
            setTrigger(false);
        }
    }
    
    return (    
        <PopUpWindow
            trigger = {trigger}
            setTrigger = {setTrigger}
            header = "View All Appointments"
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
            </div>

            {/* Button Create */}
            <ObjButton                     
                text="Submit"
                onClick={e=>onSubmit(e)}
            />

            {/* Button Error Message */}
            {boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                    >{txtError}
                </p>
            } 
        </PopUpWindow>        
    )
}

export default PopUpApptSelect
