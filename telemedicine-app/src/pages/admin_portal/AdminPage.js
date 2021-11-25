import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import AdminSchedule from "./AdminSch/AdminSchedule"
import Canvas from "../../components/Canvas"
import ObjLink from '../../components/Objects/ObjLink'
import PopUpAddAppt from './PopupPages/PopUpAddAppt'

import './AdminPage.css'
//import './PopupPages/PopUp.css'
import AdminApts from "./AdminApts/AdminApts"
import PopUpAddPatient from './PopupPages/PopUpAddPatient'
// Test
//Test 2

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

    //New Appt Popup handler
    const [apptInputPopup, setApptInputPopup] = React.useState(false);    
    const apptClick = (e) => {
        console.log("Appointment Click");
        console.log("click", e);
        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        console.log("Popup is ",bPop);
    }

    return (
        <div>
            <Canvas>                
                    <div className='adminpage-container'>

                        <div className='adminpage-schedule-frame'>
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

                            {/* Schedule Frame  */}
                            <AdminSchedule/>
                        </div>


                        <div className='appointment-frame'>
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
                                
                            {/* Appointment Frame  */}
                            <AdminApts/>
                        </div>
                            
                            {/* All Popups here */}

                            <div>
                                <PopUpAddPatient
                                    trigger={newPatientPopup}
                                    setTrigger={setnewPatientPopup}
                                />
                            </div>

                            {/* New Apt */}
                            <div>
                                <PopUpAddAppt
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
