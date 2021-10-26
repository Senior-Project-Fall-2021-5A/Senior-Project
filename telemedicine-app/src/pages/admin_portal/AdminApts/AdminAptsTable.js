import React from 'react'
import PropTypes from 'prop-types'
import ObjLink from '../../../components/Objects/ObjLink'
import ObjInputFile from '../../../components/Objects/ObjInputFile'
import OBJPopUpInput from '../../../components/Objects/OBJPopUpInput'

const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}

const AdminAptsTable = ({  }) => {
    const data = [
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
        {time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
    ]

    const [notesInputPopup, setNotesInputPopup] = React.useState(false);

    const noteClick = (e) => {
        console.log("click", e);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        console.log("Popup is ",bPop);
    }

    const handleCall = (event) => {
        window.open(
            'https://www.youtube.com/watch?v=vLRyJ0dawjM&ab_channel=EDMBot',
            '_blank'
        );
    }

    //linkInfo={reportLink} linkInfo ='/adminPortal'
    //doNewWindow= {Boolean} true
    
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
                    {data.map(({time, patient, type, notesLink, reportLink, call}) => (
                         <tr>
                            <td style={styleTD}>{time}</td>
                            <td style={styleTD}>{patient}</td>
                            <td style={styleTD}>{type}</td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = {Boolean} false                                    
                                    text="Add"
                                    onClick={e => noteClick(e)}
                                />
                                <OBJPopUpInput 
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                />
                                
                            </td>
                            <td style={styleTD}>
                                <ObjInputFile/>
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink= {Boolean} false                                    
                                    text="Call"
                                    onClick={e=>handleCall(e)}
                                />
                            </td>                                             
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
