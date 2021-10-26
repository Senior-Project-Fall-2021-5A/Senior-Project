import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import AdminSchedule from "./AdminSch/AdminSchedule"
import Canvas from "../../components/Canvas"

import './AdminPage.css'
import AdminApts from "./AdminApts/AdminApts"
//<AdminSchedule/>

/*
<div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
</div>
                    </div>
                </div>

*/

function AdminPage() {
    return (
        <div>
            <Navbar/>
                <Canvas>                
                    <div className='adminpage-container'>
                        <div className='adminpage-schedule-frame'>
                            <AdminSchedule/>
                        </div>
                        <div className='appointment-frame'>
                            <AdminApts/>
                        </div>
                    </div>
                </Canvas>
            <Footer/>
            
        </div>
    )
}

export default AdminPage
