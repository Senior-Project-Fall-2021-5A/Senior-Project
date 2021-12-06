import React from 'react';
import AdminSchedule from "./AdminSch/AdminSchedule";
import Canvas from "../../components/Canvas";
import ObjLink from '../../components/Objects/ObjLink';
import PopUpAddAppt from './PopupPages/PopUpAddAppt';
import AdminApts from "./AdminApts/AdminApts";
import PopUpAddPatient from './PopupPages/PopUpAddPatient';
import PopUpAddStaff from './PopupPages/PopUpAddStaff';
import PopUpEditPatient from './PopupPages/PopUpEditPatient';
import PopUpApptSelect from './PopupPages/PopUpApptSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AdminPage.css'


function AdminPage() {

    //New Patient Popup handler
    const [newPatientPopup, setnewPatientPopup] = React.useState(false);    
    const newPatientClick = (e) => {
        console.log("New Patient Click");
        console.log("click", e);
        let bPop = !newPatientPopup;
        setnewPatientPopup(bPop);
        console.log("Popup is ",bPop);
    }

    //Edit Patient Popup handler
    const [editPatientPopup, seteditPatientPopup] = React.useState(false);    
    const editPatientClick = (e) => {
        console.log("edit Patient Click");
        console.log("click", e);
        let bPop = !editPatientPopup;
        seteditPatientPopup(bPop);
        console.log("Popup is ",bPop);
    }

    //New Staff Popup handler
    const [newStaffPopup, setnewStaffPopup] = React.useState(false);    
    const newStaffClick = (e) => {
        console.log("New Patient Click");
        console.log("click", e);
        let bPop = !newStaffPopup;
        setnewStaffPopup(bPop);
        console.log("Popup is ",bPop);
    }

    //New Appt Popup handler
    const [apptInputPopup, setApptInputPopup] = React.useState(false);    
    const apptClick = (e) => {
        console.log("Appointment Click");
        console.log("click", e);
        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        console.log("Popup is ",bPop);
    }

    //All Apts
    const [allApptsPopup, setAllApptsPopup] = React.useState(false);   
    const allApptsClick = ( event ) => {
        console.log("New Patient Click");
        console.log("click", event);
        let bPop = !allApptsPopup;
        setAllApptsPopup(bPop);
        console.log("Popup is ",bPop);
    }

    //dates
    const [dateValue, setDateValue] = React.useState(new Date());
    const [txtDateValue, setTxtDateValue] = React.useState(new Date().toLocaleDateString("en-US").split('/').join('-'));
    const [boolShowAll, setBoolShowAll] = React.useState(false);
    const dateSelected = ( event ) => {
        setDateValue(event);
        //convert date to string
        setTxtDateValue(event.toLocaleDateString("en-US").split('/').join('-'));
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

                                {/* all Appts Button  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px',                        
                                    }}
                                >
                                    <ObjLink                                                        
                                        text="All Appts"
                                        btnWidth = "125px"
                                        onClick={e => allApptsClick(e)}
                                        doLink = "false"   
                                    />              
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

                                {/* Date Text  */}
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        left: '30px', 
                                        top: '10px',
                                    }}
                                >
                                    <h6>Select Date</h6>             
                                </div> 
                            </div>
                            
                                
                            {/* Appointment Frame  */}
                            <AdminApts
                                dateValue={txtDateValue}
                                boolShowAll={allApptsPopup}                               
                            />
                        </div>
                            
                            {/* All Popups here */}
                            {/* New Patient */}
                            <div>
                                <PopUpAddPatient
                                    trigger={newPatientPopup}
                                    setTrigger={setnewPatientPopup}
                                />
                            </div>

                            {/* Edit Patient */}
                            <div>
                                <PopUpEditPatient
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

                            {/* New Apt */}
                            <div>
                                <PopUpAddAppt
                                    trigger={apptInputPopup}
                                    setTrigger={setApptInputPopup}
                                />
                            </div>

                            {/* All Apts */}
                            <div>
                                <PopUpApptSelect
                                    trigger={allApptsPopup}
                                    setTrigger={setAllApptsPopup}
                                />
                            </div>
                        
                    </div>
                </Canvas>
            
        </div>
    )
}

export default AdminPage
