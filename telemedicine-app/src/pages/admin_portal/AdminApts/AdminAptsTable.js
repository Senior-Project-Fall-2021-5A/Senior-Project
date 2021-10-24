import React from 'react'
import PropTypes from 'prop-types'

const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}

const AdminAptsTable = ({  }) => {
    const data = [
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notes: "notes", report: "report", call: "call"},
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notes: "notes", report: "report", call: "call"},
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notes: "notes", report: "report", call: "call"},
    ]
    
    return (
        <div>
            <table id="AptsToday" class='table'>
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Type</th>
                        <th>Notes</th>
                        <th>Report</th>
                        <th>Call</th>
                    </tr>
                    {data.map(({time, patient, type, notes, report, call}) => (
                         <tr>
                            <td style={styleTD}>{time}</td>
                            <td style={styleTD}>{patient}</td>
                            <td style={styleTD}>{type}</td>
                            <td style={styleTD}>{notes}</td>
                            <td style={styleTD}>{report}</td>
                            <td style={styleTD}>{call}</td>                                             
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

AdminAptsTable.propTypes = {

}

export default AdminAptsTable
