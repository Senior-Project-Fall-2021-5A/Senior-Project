import React from 'react';
import { useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton';
import Axios from 'axios';
import authUserObject from '../../../middleware/authUserObject';


const PopUpComposeMessage = ({ trigger, setTrigger }) => {
    //declarations
    const [txtBody, setBody] = React.useState("");
    const [txtSubject, setSubject] = React.useState("");
    const [txtPatientLName, setPatientLName] = React.useState("");
    const [textDoctor, setDoctor] = React.useState([]);
    const [listOfPatients, setListOfPatients] = React.useState([]);
    const [listOfDoctors, setListOfDoctors] = React.useState([]);
    const [boolError, setBoolError] = React.useState(false);
    const [txtError, setError] = React.useState("");
    const [userID, setUserID] = React.useState(authUserObject.userId);
    const [doctorUID, setDoctorUID] = React.useState("");
    const [txtTypeSelect, setTypeSelect] = React.useState("");
    const [boolShowPatient, setShowPatient] = React.useState(true);

    //Load Patients and Doctors
    useEffect(() => {
        CreateListOfPatients();
        CreateListOfDoctors();
    }, []);

    const CreateListOfPatients = () => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getPatients')
            .then((response) => {
                let data = response.data;
                //console.log("response:", data);
                data.forEach(e => {
                    setListOfPatients(listOfPatients => [...listOfPatients, {
                        label: e.lastName + ", " + e.firstName + " [" + e.userUID.slice(-4) + "]",
                        value: e.userUID,
                    }]
                    )
                });
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    const CreateListOfDoctors = () => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
            .then((response) => {
                let data = response.data;
                //console.log("response:", data);
                data.forEach(e => {
                    setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                        label: e.lastName + ", " + e.firstName + " [" + e.userUID.slice(-4) + "]",
                        value: e.userUID,
                    }]
                    )
                });
            }).catch((err) => {
                console.log(err, "Unable to get Doctors");
            });
    }


    /***************************************************** 
                    Event Handlers
    ******************************************************/
    //Set who to send it    
    const onRadioSendSelect = (event) => {
        let type = event.target.value;
        setTypeSelect(type);
        //console.log("Radio type Select: ", type);
        let doTypePatient = type == "patient";
        setShowPatient(doTypePatient);
    }




    //Doctor Select
    const onDoctorSelect = (event) => {
        //console.log("onDoctorSelect - ", event);
        //console.log("Value set: ", event.target.value);
        setDoctorUID(event.target.value);
    }


    const sendNotification = () => {
        Axios({
            method: 'post',
            url: 'https://telemedicine5a-backend.herokuapp.com/notifs/addNotifications',
            data: {
                userUID: doctorUID,
                notif_type: 'inbox',
                isRead: false
            }
        });
    }


    // Create Message
    const onSubmit = (event) => {
        //console.log(event);
        //console.log("The subject is", txtSubject)
        //console.log("The message is", txtBody);
        //console.log("User ID!!!!!", authUserObject.userId);


        const date = new Date();
        date.getDate();

        if (textDoctor == "_placeholder_" || txtBody == "" || txtSubject == "") {
            setBoolError(true);
            setError("Please Fill out all the above Information.");
        } else {
            setBoolError(false);
            // setDoctor("");
            setBody("");
            setSubject("");
            setPatientLName("");
            setTrigger(false);
            sendMessage();
            sendNotification();
        }
    }

    const date = new Date();
    date.getDate();

    const sendMessage = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/inbox/sendMessage', {
            senderID: userID,
            recieverID: doctorUID,
            subject: txtSubject,
            body: txtBody,
            date: date
        }).then((response) => {
            //console.log("Add Appt, addAppointment(), response: ", response)

            //cleanup
            setBoolError(false);
            setTrigger(false);
        }).catch((err) => {
            //get Error
            //console.log("Org Error: ", err);

            //error display
            setError("Unable to add time");
            setBoolError(true);
        });
    }

    return (

        <PopUpWindow
            trigger={trigger}
            setTrigger={setTrigger}
            header="Compose Message"
        >
            {/* Grid */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "35px 35px 35px 35px 35px 35px 50px",
                    gridTemplateColumns: "125px 325px",
                }}


            > {/* Radio Type of Visit Select */}
                <div className="popup_spread_grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gridRow: 1,
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        justifyContent: "center",
                        position: 'relative',
                        top: "-10px"
                    }}
                    onChange={e => onRadioSendSelect(e)}
                >
                    {/* btn patient */}
                    <input
                        type="radio"
                        value="patient"
                        name="radioLocation"
                    />
                    <pre><p
                        style={{
                            position: "relative",
                            top: "16px"
                        }}
                    > Patient     </p></pre>

                    {/* Btn doctor */}
                    <input
                        type="radio"
                        value="doctor"
                        name="radioLocation"
                    />
                    <pre><p
                        style={{
                            position: "relative",
                            top: "16px"
                        }}
                    > Doctor</p></pre>
                </div>
                {/* Send To Select */}
                <div className="popup_label_grid"
                    style={{
                        gridRow: 2,
                        gridColumn: 1,
                    }}
                >
                    <h5 className="popup_label">Send To:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow: 2,
                        gridColumn: 2,
                    }}
                >


                    {boolShowPatient == true ?
                        <div>
                            <select
                                style={{
                                    height: "25px",
                                    width: "300px",
                                    textAlign: "left",
                                }}
                                onChange={e => onDoctorSelect(e)}
                            >
                                <option value="_placeholder_">Select Patient</option>
                                {listOfPatients.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        :
                        <div>

                            <select
                                style={{
                                    height: "25px",
                                    width: "300px",
                                    textAlign: "left",
                                }}
                                onChange={e => onDoctorSelect(e)}
                            >

                                <option value="_placeholder_">Select Doctor</option>
                                {listOfDoctors.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                    }



                </div>

                {/* Subject */}
                <div className="popup_label_grid"
                    style={{
                        gridRow: 3,
                        gridColumn: 1,
                    }}
                >
                    <h5 className="popup_label">Subject:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow: 3,
                        gridColumn: 2,
                    }}
                >
                    <input
                        type="text"
                        value={txtSubject}
                        onChange={e => setSubject(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Message */}
                <div className="popup_label_grid"
                    style={{
                        gridRow: 4,
                        gridColumn: 1,
                    }}
                >
                    <h5 className="popup_label">Message:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow: 4,
                        gridColumn: 2,
                    }}
                >
                    <textarea
                        type="text"
                        value={txtBody}
                        onChange={e => setBody(e.target.value)}
                        style={{
                            height: "150px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>



                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow: 9,
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                    }}
                >
                    <ObjButton
                        text="Send"
                        onClick={e => onSubmit(e)}
                    />
                </div>
            </div>

            {/* Button Error Message */}
            {
                boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                >{txtError}</p>
            }
        </PopUpWindow >

    )
}

export default PopUpComposeMessage