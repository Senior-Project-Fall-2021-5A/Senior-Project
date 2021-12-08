import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton'
import ObjInputFile from '../../../components/Objects/ObjInputFile';

const PopUpAddReport = ( {userUID, appointmentsUID, doctorUID, txtDate, locationUID, trigger,setTrigger} ) => {
    const [textInput, setTextInput] = React.useState("");
    const [file, setFile] = React.useState(new FormData());
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //Load Patients and Doctors
    useEffect(() => {
        console.log("userUID: ",userUID);
        console.log("appointmentsUID: ",appointmentsUID);
        console.log("doctorUID: ",doctorUID);
        console.log("txtDate: ",txtDate);
        console.log("locationUID: ",locationUID);
    }, []);

    const onTextChange = (event) => {
        //console.log(event);
        //console.log(event.target.value);
        setTextInput(event.target.value)
        //console.log(textInput);
    }

    const fileHandler = (event) => {
        //console.log(event);
        //console.log(event.target);
        let tempFile = event.target.files[0]; 

        console.log("tempfile", tempFile);

        file.append("file",tempFile)

        console.log("file:", file);

        setBoolError(false);
        setError("");
    }

    const onSubmit = (event) => {
        console.log("Add Report - ",
        "userUID",userUID,
        "appointmentsUID",appointmentsUID,
        "doctorUID",doctorUID,
        "txtDate",txtDate,
        "textInput",textInput,
        "file",file,
        "locationUID",locationUID);
        
        addReport();
    }

    //Create Apt
    const addReport = () => {
        if (file){
            /* console.log("Report Add -  userUID: ",userUID," appointmentsUID: ",appointmentsUID, " doctorUID: ",doctorUID,
            " txtDate: ",txtDate, " textInput: ",textInput," formData: ",formData, " locationUID: ",locationUID); */
            Axios.post('https://telemedicine5a-backend.herokuapp.com/reports/addReport', {
                    userUID:            userUID,
                    appointmentsUID:    appointmentsUID,
                    doctorUID:          doctorUID,
                    date:               txtDate,
                    details:            textInput,
                }).then((response) => {
                    console.log("Add Report, response: ",response) 
                    addFile(response);
                    
                   
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

    //send File
    const addFile = ( response ) => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/file/uploadFiles', {
                    reportUID:  response.data._id,
                    //file:    
                }).then((response) => {
                    console.log("Add Report, response: ",response) 
                    sendNotification();
                    
                }).catch((err) => {
                    //get Error
                    console.log("Org Error: ",err);

                    //error display
                    setError("Unable to add Report");
                    setBoolError(true);            
                });
    }

    //send Notification
    const sendNotification = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/notifs/addNotifications', {
                    userUID: userUID,
                    notif_type: 'report',
                    isRead: false
                }).then((response) => {
                    console.log("Add Report, response: ",response) 
                    
                    //cleanup
                    setBoolError(false);
                    setError("");
                    setTextInput("");
                    
                    setFile([]); 
                    setTrigger(false);
                }).catch((err) => {
                    //get Error
                    console.log("Org Error: ",err);

                    //error display
                    setError("Unable to send notification for Report");
                    setBoolError(true);            
                });
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
