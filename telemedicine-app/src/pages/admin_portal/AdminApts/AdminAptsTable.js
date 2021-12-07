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

const AdminAptsTable = ({ dateValue, txtPatientID, apptInputPopup }) => {
    const [notesInputPopup, setNotesInputPopup] = useState(false);
    const [listOfAppointments, setListOfAppointments] = useState([]);
    const [listOfAppointmentsUpdate, setListOfAppointmentsUpdate] = useState([]);
    const [reportInputPopup, setReportInputPopup] = useState(false);    
    //const dateToSend = date.toLocaleDateString(`en-US`).split('/').join('-');

    useEffect(() => {
        //console.log("AdminAptTable date: ",dateValue);
        let axiosUrl = (txtPatientID == "_self_") ? 
            `https://telemedicine5a-backend.herokuapp.com/appointments/getAppointmentsByDate/${authUserObject.userId}/${dateValue}`
            :
            `https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${txtPatientID}`;
        Axios.get(axiosUrl)//${dateToSend}
        .then((appointmentResponse) => {
            //console.log('IMPORTANT', appointmentResponse)
            let apptData = appointmentResponse.data;
            //console.log("apptData: ",apptData);
            if(Array.isArray(apptData)){
                setTheNames( apptData );
            } else {
                setListOfAppointments([]);
            }
            
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments for selected date");
        });
    }, [apptInputPopup, dateValue, txtPatientID]);

    const setTheNames = ( apptData ) => {
        let newList = [];
        apptData.forEach(e=>{
            let id = e.userUID;
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {                
                    let data = response.data;           
                    //console.log("setTheNames() - response:",data);
                    
                    let name = data[0].lastName+", "+data[0].firstName ;
                    //console.log("setTheNames() - name:",name);
                    
                    e.patientName = name;
                    //console.log("setTheNames() - e.patientName:",e.patientName);
                    
                    //console.log("setTheNames() - apptData: ",apptData);
                    newList = [...newList,e];

                    
                    
                    setListOfAppointments(newList);
                    
                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
            //Covnert string to Date.
            e.date = new Date(e.date.split('-').join('/'));            
        });
    }


    const noteClick = (e) => {
        //console.log("Note Click");
        //console.log("click", e);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        //console.log("Popup is ",bPop);
    }


    const reportClick = (e) => {
        //console.log("Report Click");
        //console.log("click", e);
        let bPop = !reportInputPopup;
        setReportInputPopup(bPop);
        //console.log("Popup is ",bPop);
    }



    const handleCall = (event) => {
        window.open(
            'https://www.youtube.com/watch?v=vLRyJ0dawjM&ab_channel=EDMBot',
            '_blank'
        );
    }



   
    //console.log('IMPORTANTLIST', listOfAppointments)
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
                    {listOfAppointments !== undefined ? listOfAppointments.map((appointment) => (
                         <tr key={appointment._id} >
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
                                    userUID={appointment.userUID}
                                    appointmentsUID={appointment._id}
                                    doctor={appointment.doctorUID}
                                    date={appointment.date}
                                    locationUID={appointment.locationUID}
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
