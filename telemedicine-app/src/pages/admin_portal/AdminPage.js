import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import AdminSchedule from "./AdminSch/AdminSchedule"
import Canvas from "../../components/Canvas"

import './AdminPage.css'
//<AdminSchedule/>

function AdminPage() {
    return (
        <div>
            <Navbar/>
            
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                            <div className='adminpage-container'>
                                <div className='adminpage-schedule-frame'>
                                    <AdminSchedule/>
                                    
                                </div>
                                <div className='appointment-frame'>apt frame</div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
            
        </div>
    )
}

export default AdminPage
