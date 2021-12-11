import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import authUserObject from '../../middleware/authUserObject';
import AdminSchedule from "./AdminSch/AdminSchedule";
import Canvas from "../../components/Canvas";
import ObjLink from '../../components/Objects/ObjLink';
import PopUpAddAppt from './PopupPages/PopUpAddAppt';
import AdminApts from "./AdminApts/AdminApts";
import PopUpAddPatient from './PopupPages/PopUpAddPatient';
import PopUpAddStaff from './PopupPages/PopUpAddStaff';
import PopUpAddLocation from './PopupPages/PopUpAddLocation';
import PopUpEditPatient from './PopupPages/PopUpEditPatient';
import PopUpApptSelect from './PopupPages/PopUpApptSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AdminPage.css'
import $ from 'jquery';


function AdminPage() {
    $(document).ready(function(){
        $('.canvas').slideDown(200);
    });
    

    //New Patient Popup handler
    const [newPatientPopup, setnewPatientPopup] = React.useState(false);    
    const newPatientClick = (e) => {
        //console.log("New Patient Click");
        //console.log("click", e);
        let bPop = !newPatientPopup;
        setnewPatientPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //Edit Patient Popup handler
    const [editPatientPopup, seteditPatientPopup] = React.useState(false);    
    const editPatientClick = (e) => {
        //console.log("edit Patient Click");
        //console.log("click", e);
        let bPop = !editPatientPopup;
        seteditPatientPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //New Staff Popup handler
    const [newStaffPopup, setnewStaffPopup] = React.useState(false);    
    const newStaffClick = (e) => {
        //console.log("New Patient Click");
        //console.log("click", e);
        let bPop = !newStaffPopup;
        setnewStaffPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //New Loc Popup handler
    const [newLocPopup, setnewLocPopup] = React.useState(false);    
    const newLocClick = (e) => {
        //console.log("New Patient Click");
        //console.log("click", e);
        let bPop = !newLocPopup;
        setnewLocPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //New Appt Popup handler
    const [apptInputPopup, setApptInputPopup] = React.useState(false);    
    const apptClick = (e) => {
        //console.log("Appointment Click");
        //console.log("click", e);
        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        //console.log("Popup is ",bPop);
    }

    //dates
    const [dateValue, setDateValue] = React.useState(new Date());
    const [txtDateValue, setTxtDateValue] = React.useState(new Date().toLocaleDateString("en-US").split('/').join('-'));
    const dateSelected = ( event ) => {
        setDateValue(event);
        //convert date to string
        setTxtDateValue(event.toLocaleDateString("en-US").split('/').join('-'));
    }

    //Load Patients
    useEffect(() => {
        CreateListOfPatients();
    }, [authUserObject.patientCounter]);

    //create List of Patients
    const [listOfPatients,setListOfPatients] = React.useState([]);  
    const [txtPatientID,setPatientID] = React.useState("_self_");  
    const CreateListOfPatients = (  ) => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getPatients')        
            .then((response) => {                
                let data = response.data;           
                //console.log("AdminPage - response:",data);
                data.forEach(e=>{setListOfPatients(listOfPatients => [...listOfPatients, {
                    label: e.lastName+", "+e.firstName+" ["+e.userUID.slice(-4)+"]",
                    value: e.userUID,
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

    //set patient
    const onPatientSelect = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    return (
        <div>
            <Canvas>                
                    <div className='adminpage-container'>

                        <div className='adminpage-schedule-frame'>
                            <div className="adminpage_buttons_top">
                                {/* New Patient Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="New Patient"
                                        btnWidth = "125px"
                                        onClick={e => newPatientClick(e)}
                                        doLink = "false"   
                                    />                                    
                                </div>    

                                {/* edit Patient Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="Edit Patient"
                                        btnWidth = "125px"
                                        onClick={e => editPatientClick(e)}
                                        doLink = "false"   
                                    />                                    
                                </div>

                                {/* New Staff Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="New Staff"
                                        btnWidth = "125px"
                                        onClick={e => newStaffClick(e)}
                                        doLink = "false"   
                                    />                                    
                                </div> 

                                {/* New Location Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="New Loc"
                                        btnWidth = "125px"
                                        onClick={e => newLocClick(e)}
                                        doLink = "false"   
                                    />                                    
                                </div> 
                            </div>
                            

                            {/* Schedule Frame  */}
                            <AdminSchedule/>
                        </div>


                        <div className='appointment-frame'>
                            <div className="adminpage_buttons_top">
                                {/* New Apt Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="New Appt"
                                        btnWidth = "125px"
                                        onClick={e => apptClick(e)}
                                        doLink = "false"
                                    />
                                    
                                </div>  

                                

                                {/* Date Text  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px', 
                                        top: '10px',
                                    }}
                                >
                                    <h6>Select Date: </h6>             
                                </div> 

                                {/* Date Select */}
                                <div className="popup_spread_grid"
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',
                                        top: '5px',
                                    }}
                                >                                    
                                    <div>
                                        <DatePicker                            
                                            selected={dateValue}
                                            onChange={e=>dateSelected(e)}
                                        />
                                    </div> 
                                </div>
                                {/* Patient Text  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px', 
                                        top: '10px',
                                    }}
                                >
                                    <h6>Or see All Apt for: </h6>             
                                </div> 
                                {/* Patient Select */}
                                <div 
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px', 
                                        top: '8px',
                                    }}
                                >
                                    <select
                                        style={{
                                            height: "25px",
                                            width: "200px",
                                            textAlign: "left",
                                        }}
                                        onChange={e=>onPatientSelect(e)}  
                                    >
                                        <option key="ap_patient_self" value="_self_">{authUserObject.lastName+", "+authUserObject.firstName}</option>
                                        {listOfPatients.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            
                                
                            {/* Appointment Frame  */}
                            <AdminApts
                                dateValue={txtDateValue}
                                txtPatientID={txtPatientID}  
                                apptInputPopup={apptInputPopup}                                                           
                            />
                        </div>
                            
                            {/* All Popups here */}
                            {/* New Patient */}
                            <div>
                                <PopUpAddPatient
                                    newStaffPopup={newStaffPopup}
                                    trigger={newPatientPopup}
                                    setTrigger={setnewPatientPopup}
                                />
                            </div>

                            {/* Edit Patient */}
                            <div>
                                <PopUpEditPatient
                                    newPatientPopup={newPatientPopup}
                                    newStaffPopup={newStaffPopup}
                                    trigger={editPatientPopup}
                                    setTrigger={seteditPatientPopup}
                                />
                            </div>

                            {/* New Staff */}
                            <div>
                                <PopUpAddStaff
                                    trigger={newStaffPopup}
                                    setTrigger={setnewStaffPopup}
                                />
                            </div>

                            {/* New Location */}
                            <div>
                                <PopUpAddLocation
                                    trigger={newLocPopup}
                                    setTrigger={setnewLocPopup}
                                />
                            </div>

                            {/* New Apt */}
                            <div>
                                <PopUpAddAppt
                                    newPatientPopup={newPatientPopup}
                                    newStaffPopup={newStaffPopup}
                                    trigger={apptInputPopup}
                                    setTrigger={setApptInputPopup}
                                />
                            </div>
                            
                        
                    </div>
                </Canvas>
            
        </div>
    )
}

export default AdminPage
