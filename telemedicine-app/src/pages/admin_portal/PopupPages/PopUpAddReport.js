import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton'
import ObjInputFile from '../../../components/Objects/ObjInputFile';

const PopUpAddReport = ( {userUID, appointmentsUID, doctorUID, date, locationUID, trigger,setTrigger} ) => {
    const [textInput, setTextInput] = React.useState("");
    const [txtDate, setTxtDate] = React.useState(date.toLocaleDateString("en-US").split('/').join('-'));
    const [file, setFile] = React.useState(null);
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //Load Patients and Doctors
    useEffect(() => {
        console.log("userUID: ",userUID);
        console.log("appointmentsUID: ",appointmentsUID);
        console.log("doctorUID: ",doctorUID);
        console.log("date: ",date);
        console.log("locationUID: ",locationUID);
        console.log("txtDate: ",txtDate);
    }, []);

    const getPatientID = ( event ) => {

    }
    
    const onTextChange = (event) => {
        //console.log(event);
        //console.log(event.target.value);
        setTextInput(event.target.value)
        //console.log(textInput);
    }
    const onSubmit = (event) => {
        console.log("Add Report - ",
        "userUID",userUID,
        "appointmentsUID",appointmentsUID,
        "doctorUID",doctorUID,
        "txtDate",txtDate,
        "textInput",textInput,
        "file",file[0],
        "locationUID",locationUID)
        
        console.log(event);
        console.log(textInput);
        setTextInput("");
        setTrigger(false);
    }

    const fileHandler = (event) => {
        //console.log(event);
        //console.log(event.target);
        let tempFile = event.target.files[0]; 
        console.log(tempFile);

        setFile(tempFile);

        setBoolError(false);
        setError("");
    }

    //Create Apt
    const addReport = () => {
        if (file != null){
            //create Object
            const formData = new FormData();
            formData.append(
                userUID+txtDate,
                file,
                file.name
            );

            /* console.log("Final Add Apt -  textPatientID: ",textPatientID," textDoctorID: ",textDoctorID, " txtDate: ",txtDate,
            " textTime: ",textTime, " txtLocSelect: ",txtLocSelect," txtLocation: ",txtLocation); */
            Axios.post('https://telemedicine5a-backend.herokuapp.com/reports/addReport', {
                userUID:            userUID,
                appointmentsUID:    appointmentsUID,
                doctor:             doctorUID,
                date:               txtDate,
                details:            textInput,
                attachments:        formData,
                locationUID:        locationUID,
            }).then((response) => {
                //console.log("Add Appt, addAppointment(), response: ",response) 
                
                //cleanup
                setBoolError(false);
                setError("");
                setTextInput("");
                setTxtDate(date.toLocaleDateString("en-US").split('/').join('-'));
                setFile(null); 
                setTrigger(false);
            }).catch((err) => {
                //get Error
                console.log("Org Error: ",err);

                //error display
                setError("Unable to add Report");
                setBoolError(true);            
            });
        } else {
            setError("Missing File, please add a file first.");
            setBoolError(true);
        }

        
    }
    
    return (
    
            <PopUpWindow
                    trigger = {trigger}
                    setTrigger = {setTrigger}
                    header = "Add Report"
            >                
                <p
                    style={{
                        position:'relative',
                        left:"-193px",
                        top: "15px",
                    }}
                >Doctors Notes:</p>
                <textarea
                    defaultValue={textInput}
                    style={{width:"500px"}}
                    type="text"    
                    onChange={e=>onTextChange(e)}   
                />
                <div>
                    <label className="objbutton" for="inputFile" style={{width:"100px"}}>Upload</label>
                    <input 
                        className="objinputfile-input-hidden" 
                        id="inputFile" 
                        type="file" 
                        style={{visibility:"hidden"}} 
                        onChange={e=>fileHandler(e)}
                    />
                </div>
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
                >{txtError}</p>
            } 
            </PopUpWindow>        
    )
}

export default PopUpAddReport
