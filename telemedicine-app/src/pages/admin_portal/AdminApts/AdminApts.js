import React from 'react'
import './adminApts.css'
import ObjLink from '../../../components/Objects/ObjLink'
import AdminAptsTable from './AdminAptsTable'
import PopUpApptSelect from '../PopupPages/PopUpApptSelect'



const AdminApts = ({  }) => {

    //New Patient Popup handler
    const [allApptsPopup, setAllApptsPopup] = React.useState(false);    
    const allApptsClick = ( event ) => {
        console.log("New Patient Click");
        console.log("click", event);
        let bPop = !allApptsPopup;
        setAllApptsPopup(bPop);
        console.log("Popup is ",bPop);
    }

    return (
        <div className="adminapts-container">
            <div className="adminapts-header">
                <h1>Appointments</h1>
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
            </div>

            {/* Appts Table */}
            <div 
                className="adminapts-table"
                style={{
                    position: 'relative',
                    top: '-30px'
                }}
            >
                <AdminAptsTable/>
            </div>

            {/* New Patient */}
            <div>
                <PopUpApptSelect
                    trigger={allApptsPopup}
                    setTrigger={setAllApptsPopup}
                />
            </div>
        </div>
        
    )
}

AdminApts.propTypes = {

}

export default AdminApts
