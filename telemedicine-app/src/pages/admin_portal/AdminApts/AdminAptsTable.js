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

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointmentsByDate/${authUserObject.userId}/${date}`)
        .then((appointmentResponse) => {
            appointmentResponse.map((appointment, index) => {
                Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${appointment.userUID}`)
                .then((userProfileResponse) => {
                    appointmentResponse.append('patientName', userProfileResponse.firstName + ' ' + userProfileResponse.lastName)
                    
                })
            })
            setListOfAppointments(appointmentResponse);
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments for selected date");
        });
    }, []);


    const noteClick = (e) => {
        console.log("Note Click");
        console.log("click", e);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        console.log("Popup is ",bPop);
    }
    
    const [reportInputPopup, setReportInputPopup] = React.useState(false);

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
                    {listOfAppointments.map((appointment, index) => (
                         <tr>
                            <td style={styleTD}>{appointment.date}</td>
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
                    ))}
                </tbody>

            </table>
        </div>
    )
}

AdminAptsTable.propTypes = {

}

export default AdminAptsTable