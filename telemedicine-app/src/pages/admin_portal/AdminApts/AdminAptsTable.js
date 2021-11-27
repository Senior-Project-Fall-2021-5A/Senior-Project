import React from 'react'
import PropTypes from 'prop-types'
import ObjLink from '../../../components/Objects/ObjLink'
import PopUpAddNotes from '../PopupPages/PopUpAddNotes'
import PopUpAddReport from '../PopupPages/PopUpAddReport'



const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}

const AdminAptsTable = ({  }) => {
    const data = [
        {date: "04/04/2021", time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
        {date: "04/04/2021", time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
        {date: "04/04/2021", time: "09:00 am", patient: "Billy Bob Man", type:"Office", notesLink: '/reports', reportLink: '/reports', call: "call"},
    ]

    const [notesInputPopup, setNotesInputPopup] = React.useState(false);
    

    const noteClick = (e) => {
        console.log("Note Click");
        console.log("click", e);
        let bPop = !notesInputPopup;
        setNotesInputPopup(bPop);
        console.log("Popup is ",bPop);
    }
    
    const [reportInputPopup, setReportInputPopup] = React.useState(false);

    const reportClick = (e) => {
        console.log("Report Click");
        console.log("click", e);
        let bPop = !reportInputPopup;
        setReportInputPopup(bPop);
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

   /*  <ObjPopUpWindow 
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                /> */
    
    return (
        <div>
            <table id="AptsToday" class='table'>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Type</th>
                        <th>Notes</th>
                        <th>Report</th>
                        <th>Call</th>
                    </tr>
                    {data.map(({date, time, patient, type, notesLink, reportLink, call}) => (
                         <tr>
                            <td style={styleTD}>{date}</td>
                            <td style={styleTD}>{time}</td>
                            <td style={styleTD}>{patient}</td>
                            <td style={styleTD}>{type}</td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => noteClick(e)}
                                />
                                <PopUpAddNotes
                                    trigger={notesInputPopup}
                                    setTrigger={setNotesInputPopup}
                                />
                                
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink = "false"                                    
                                    text="Add"
                                    btnWidth = "60px"
                                    onClick={e => reportClick(e)}
                                />
                                <PopUpAddReport
                                    trigger={reportInputPopup}
                                    setTrigger={setReportInputPopup}
                                />
                            </td>
                            <td style={styleTD}>
                                <ObjLink
                                    doLink= "false"                                   
                                    text="Call"
                                    btnWidth = "60px"
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
