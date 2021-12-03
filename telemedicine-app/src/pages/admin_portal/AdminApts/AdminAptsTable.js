import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types'
import ObjLink from '../../../components/Objects/ObjLink'
import PopUpAddNotes from '../PopupPages/PopUpAddNotes'
import PopUpAddReport from '../PopupPages/PopUpAddReport'
import authUserObject from '../../../middleware/authUserObject';
import Axios from 'axios';


const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}

const AdminAptsTable = ({date}) => {
    const [notesInputPopup, setNotesInputPopup] = useState(false);
    const [listOfAppointments, setListOfAppointments] = useState([]);
    const [listOfAppointmentsUpdate, setListOfAppointmentsUpdate] = useState([]);
    const [reportInputPopup, setReportInputPopup] = useState(false);
    const dateToSend = date.toLocaleDateString(`en-US`).split('/').join('-');

    useEffect(() => {
        console.log("AdminAptTable HEREJKFBKDJF");
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${authUserObject.userId}`)//${dateToSend}
        .then((appointmentResponse) => {
            console.log('IMPORTANT', appointmentResponse)
            let apptData = appointmentResponse.data;
            console.log("apptData: ",apptData);
            

            //error checking
            /* if(appointmentResponse.data != "No appointments for user on selected Date"){
                patientID.forEach(appointment => {
                    console.log("User IDs",appointment.userUID);
                    Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${appointment.userUID}`)
                    .then((userProfileResponse) => {
                        console.log("Feedback from user Info: ",userProfileResponse);
                        let id = userProfileResponse.data[0].userUID;
                        let name = userProfileResponse.data[0].firstName + ' ' + userProfileResponse.data[0].lastName;
                        console.log("id: ",id," name: ",name);
                        listOfAppointments.forEach(e=> {
                            console.log("e.userUID: ",e.userUID);
                            console.log("e.patientName: ",e.patientName);
                            if (e.userUID == id){
                                e.patientName = name;
                            }
                        })

                        listOfAppointments.push('patientName', userProfileResponse.data[0].firstName + ' ' + userProfileResponse.data[0].lastName)
                    })
                })
                
            }Appointments */
            setTheNames( apptData );
            
            
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments for selected date");
        });
    }, []);

    const setTheNames = ( apptData ) => {
        let newList = [];
        apptData.forEach(e=>{
            let id = e.userUID;
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {                
                    let data = response.data;           
                    console.log("setTheNames() - response:",data);
                    
                    let name = data[0].lastName+", "+data[0].firstName ;
                    console.log("setTheNames() - name:",name);
                    
                    e.patientName = name;
                    console.log("setTheNames() - e.patientName:",e.patientName);
                    
                    console.log("setTheNames() - apptData: ",apptData);
                    newList = [...newList,e];
                    
                    setListOfAppointments(newList);
                    
                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
        });
    }


    const noteClick = (e) => {
        console.log("Note Click");
        console.log("click", e);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        console.log("Popup is ",bPop);
    }


    const reportClick = (e) => {
        console.log("Report Click");
        console.log("click", e);
        let bPop = !reportInputPopup;
        setReportInputPopup(bPop);
        console.log("Popup is ",bPop);
    }



    const handleCall = (event) => {
        window.open(
            'https://www.youtube.com/watch?v=vLRyJ0dawjM&ab_channel=EDMBot',
            '_blank'
        );
    }

    //linkInfo={reportLink} linkInfo ='/adminPortal'
    //doNewWindow= {Boolean} true

   /*  <ObjPopUpWindow 
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                /> */
    console.log('IMPORTANTLIST', listOfAppointments)
    return (
        <div>
            <table id="AptsToday" class='table'>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>PatientName</th>
                        <th>Type</th>
                        <th>Notes</th>
                        <th>Report</th>
                        <th>Call</th>
                    </tr>
                    {listOfAppointments !== undefined ? listOfAppointments.map((appointment, index) => (
                         <tr>
                            <td style={styleTD}>{(new Date(appointment.date)).toLocaleDateString()}</td>
                            <td style={styleTD}>{appointment.time}</td>
                            <td style={styleTD}>{appointment.patientName}</td>
                            <td style={styleTD}>{appointment.type}</td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => noteClick(e)}
                                />
                                <PopUpAddNotes
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                />
                                
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => reportClick(e)}
                                />
                                <PopUpAddReport
                                    trigger={reportInputPopup}
                                    setTrigger={setReportInputPopup}
                                />
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink= "false"                                   
                                    text="Call"
                                    btnWidth = "60px"
                                    onClick={e=>handleCall(e)}
                                />
                            </td>                                             
                        </tr>
                    )) : <span>No appointments on selected Day</span>}
                </tbody>

            </table>
        </div>
    )
}

AdminAptsTable.propTypes = {

}

export default AdminAptsTable
