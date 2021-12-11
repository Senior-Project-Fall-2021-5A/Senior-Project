import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import ObjLink from '../../../components/Objects/ObjLink';
import PopUpAddNotes from '../PopupPages/PopUpAddNotes';
import PopUpAddReport from '../PopupPages/PopUpAddReport';
import authUserObject from '../../../middleware/authUserObject';


const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}

const AdminAptsTable = ({ dateValue, txtPatientID, apptInputPopup }) => {
    //declarations
    const [isLoading, setLoading] = useState(false);
    const [notesInputPopup, setNotesInputPopup] = useState(false);
    const [listOfAppointments, setListOfAppointments] = useState([]);
    const [appt, setAppt] = useState({});
    const [listOfAppointmentsTemp, setListOfAppointmentsTemp] = useState([]);
    const [reportInputPopup, setReportInputPopup] = useState(false);
    const [apptUrl, setApptUrl] = useState("");
    const [AptInfo, setAptInfo] = React.useState([]);
    
    /***************************************************** 
                    Handlers
    ******************************************************/
   //On open and when apptInputPopup cloes
    useEffect(() => {
        if(txtPatientID && apptUrl){
            setListOfAppointments([]);
            getAppointments(apptUrl);
        }
    }, [apptInputPopup == false]);

    //when dateValue is revised
    useEffect(() => {
        //console.log("useEffect - dateValue - dateValue: ", dateValue, " txtPatientID: ",txtPatientID);
        if(txtPatientID){
            setListOfAppointments([]);
            createApptUrl();
        }
    }, [dateValue]);

    //when dateValue is revised
    useEffect(() => {
        //console.log("useEffect - txtPatientID - dateValue: ", dateValue, " txtPatientID: ",txtPatientID);
        if(txtPatientID != "_self_" || (txtPatientID == "_self_" && dateValue) ){
            setListOfAppointments([]);
            createApptUrl();
        }
    }, [txtPatientID]);

    //when appt is updated
    useEffect(() => {
        //console.log("useEffect - appt: ",appt); 
        let doAdd = true;  
        listOfAppointments.forEach(e=>{
            if (e._id == appt._id){
                doAdd = false;                
            }
        });   
        if (doAdd){
            setListOfAppointments([...listOfAppointments,appt]);
        }
        
    }, [appt]);

    /***************************************************** 
                    Functions
    ******************************************************/
    const createApptUrl = (  ) => {
        let url = "";
        if(txtPatientID == "_self_"){
            url = `https://telemedicine5a-backend.herokuapp.com/appointments/getAppointmentsByDate/${authUserObject.userId}/${dateValue}`;
        } else {
            url = `https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${txtPatientID}`;
        }        
        setApptUrl(url);
        getAppointments(url);
    }

    const noteClick = (e, appointment) => {
        //console.log("Note Click");
        //console.log("noteClick e:", e, "appointment: ",appointment);
        setAptInfo(appointment);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //report click
    const reportClick = (e, appointment) => { //userUID, appointmentsUID, doctorUID, txtDateFix, locationUID
        //console.log("reportClick e:",e, "appointment:", appointment) //userUID, appointmentsUID, doctorUID, txtDateFix, locationUID
        setAptInfo(appointment);
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


    /***************************************************** 
                    Axios Get
    ******************************************************/
    const getAppointments = ( url ) => {        
        Axios.get(url)
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
    }

    const setTheNames = ( apptData ) => {
        setListOfAppointments([]);
        var newArray = JSON.parse(JSON.stringify(apptData));
        
        //console.log("newArray:",newArray);
        newArray.forEach(e=>{
            let id = e.userUID;
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
            .then((response) => {                
                let data = response.data;           
                //console.log("setTheNames() - response:",data);
                
                e.patientName = data[0].lastName+", "+data[0].firstName;
                //console.log("setTheNames() - name:",name);
                setAppt(e);
            }).catch((err) => {
                console.log(err, "Unable to get Locations");
                return "unknown";
            });            
            //Covnert string to Date.
            console.log("check if date:",e.date,(e.date instanceof Date), e._id);
            if (e.date instanceof Date){
                e.txtDate = e.date.toLocaleDateString();
            } else{
                e.date = new Date(e.date.split('-').join('/'));
                console.log("e.date:",e.date);
                e.txtDate = e.date.toLocaleDateString();
                console.log("e.txtDate:",e.txtDate);
            }        
        });
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
                            <td style={styleTD}>{appointment.txtDate}</td>
                            <td style={styleTD}>{appointment.time}</td>
                            <td style={styleTD}>{appointment.patientName}</td>
                            <td style={styleTD}>{appointment.type}</td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => noteClick(e,appointment)}
                                />
                                <PopUpAddNotes
                                    AptInfo={AptInfo}
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                />
                                
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => reportClick(e, appointment)}
                                />
                                <PopUpAddReport
                                    AptInfo = {AptInfo}                                    
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
