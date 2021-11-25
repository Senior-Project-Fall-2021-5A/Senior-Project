import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpAddNotes = ( {trigger,setTrigger} ) => {
    const [textPatientID,setPatientID] = React.useState("");
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

    const onPatientSelect = ( event ) => {
        console.log("onPatientSelect - ",event);
        console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    const [textDoctorID,setDoctorID] = React.useState("");
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

    const onDoctorSelect = ( event ) => {
        console.log("onDoctorSelect - ",event);
        console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }

    const [date,setDate] = React.useState(new Date());

    const [textTime,setTime] = React.useState("");
    const listOfTimes =[
        {
            label: "09:00AM",
            value: "09:00AM",
        },
        {
            label: "10:00AM",
            value: "10:00AM",
        },
        {
            label: "11:00AM",
            value: "11:00AM",
        },
        {
            label: "12:00PM",
            value: "12:00PM",
        },
    ];

    const onTimeSelect = ( event ) => {
        console.log("onTimeSelect - ",event);
        console.log("Value set: ", event.target.value);
        setTime(event.target.value);
    }

    const onSubmit = (event) => {
        console.log(event);
        console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " Date: ", date, " Time: ", textTime);        
        setTrigger(false);
    }
    
    return (
    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Appointment"
        >  
            {/* Grid */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "35px 35px 35px 50px",
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
                        {listOfTimes.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}    
                    </select>
                </div>
            
                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:4,
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

export default PopUpAddNotes
