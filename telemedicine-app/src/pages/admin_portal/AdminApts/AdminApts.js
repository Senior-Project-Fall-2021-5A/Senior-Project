import React from 'react'
import PropTypes from 'prop-types'
import './adminApts.css'
import ObjLink from '../../../components/Objects/ObjLink'
import AdminAptsTable from './AdminAptsTable'



const AdminApts = ({ dateValue, txtPatientID, apptInputPopup }) => {

    return (
        <div className="adminapts-container">
            <div className="adminapts-header">
                <h1>Appointments </h1>
            </div>

            {/* Appts Table */}
            <div 
                className="adminapts-table"
                style={{
                    position: 'relative',
                    top: '-30px'
                }}
            >   
                <AdminAptsTable 
                    dateValue={dateValue}
                    txtPatientID={txtPatientID} 
                    apptInputPopup={apptInputPopup}
                />
            </div>

            
        </div>
        
    )
}

AdminApts.defaultProps = {
}

AdminApts.propTypes = {
    dateValue: PropTypes.string,
}

export default AdminApts
