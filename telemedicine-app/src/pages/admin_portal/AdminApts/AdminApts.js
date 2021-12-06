import React from 'react'
import PropTypes from 'prop-types'
import './adminApts.css'
import ObjLink from '../../../components/Objects/ObjLink'
import AdminAptsTable from './AdminAptsTable'



const AdminApts = ({ dateValue, boolShowAll }) => {

    //New Patient Popup handler
    const [date, setDate] = React.useState(new Date);
    
    
   


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
                    boolShowAll={boolShowAll}  
                />
            </div>

            
        </div>
        
    )
}

AdminApts.defaultProps = {
    dateValue: "12-06-2021",
    
}

AdminApts.propTypes = {
    dateValue: PropTypes.string,
}

export default AdminApts
