
import PropTypes from 'prop-types'
import './adminApts.css'
import AdminAptsTable from './AdminAptsTable'



const AdminApts = ({  }) => {

    return (
        <div className="adminapts-container">
            <div className="adminapts-header">
                <h1>Appointments</h1>
            </div>
            <div 
                className="adminapts-table"
                style={{
                    position: 'relative',
                    top: '-30px'
                }}
            >
                <AdminAptsTable/>
            </div>
        </div>
        
    )
}

AdminApts.propTypes = {

}

export default AdminApts
