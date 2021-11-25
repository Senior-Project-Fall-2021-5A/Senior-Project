import React from 'react'
import './reports.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Canvas from '../../components/Canvas';
import Pdf from '../../images/Patient Report.pdf';
import { useLocation } from 'react-router-dom'
import ObjLink from '../../components/Objects/ObjLink';



const ReportDisplay = () => {
    
    // Data from Reports
    //      Function: Convert data string from ObjLink back into an Object
    const location = useLocation();
    const {data} = location.state;
    let reports = JSON.parse(data);    
    //console.log("data",data,"reports",reports.doctor, reports._id);
    
    //      Set sheet values using Data from Reports
    const [sReportID, setReportID] = React.useState(reports._id);
    const [sDoctor, setDoctor] = React.useState(reports.doctor);
    console.log("_id:",sReportID,"doctor:",sDoctor);

    // Data from Backend
    //  Given:  sReportID
    //  Need:   Use Temp section to setup the data collection. 
    //  {Axios goes here}

    //***** TEMP to fill Page ***** */
    const dbReport = {
        details: "This is information on your report",
        date_time: new Date(2021, 2, 17, 15, 25, 33),
        location: {
            name: "General Practice Place",
            address1: "Attention Bob the Dob",
            address2: "1234 56th place",
            city: "Vero Beach",
            state: "FL",
            zip: "32960-1234",
        },
        pdf: Pdf,
    }

    //      Set page values using Data from DB
    const [sDetails, setDetails] = React.useState(dbReport.details);
    const [dtDateTimeApt, setDateTimeApt] = React.useState(dbReport.date_time);
    const [rLocation, setLocation] = React.useState(dbReport.location);
    const [fPDF, setPDF] = React.useState(dbReport.pdf);
    //console.log("sDetails: ", sDetails, "dtDateTimeApt:", dtDateTimeApt,"rLocation: ",rLocation, "fPDF: ", fPDF);

    //This will load PDF into a new window. 
    const loadPDF = (event, fPDF) => {
        //console.log("event: ", event, "fPDF: ",fPDF);
        window.open(fPDF);
    }
    

    return (
        <div class="title"> 
            <Canvas>
                <h1>Result Details</h1>
                <p> 
                    {sDetails} <br/>
                    Uploaded on: {dtDateTimeApt.toLocaleDateString()} @ {dtDateTimeApt.toLocaleTimeString()}<br/>
                </p>
                <div>
                    <ObjLink 
                        doLink = "false"
                        text = "View PDF"
                        onClick = {e=>loadPDF(e, `${fPDF}`)}
                        data = {reports}
                        btnWidth = '125px'
                    /></div>
                <h2>General Information</h2>
                <p>
                    {sDoctor}<br/>
                    {rLocation.name}<br/>
                    {rLocation.address1}<br/>
                    {rLocation.address2}<br/>
                    {rLocation.city}, {rLocation.state} {rLocation.zip}<br/>
                </p>                
            </Canvas>
        </div>        
    )  
}

export default ReportDisplay; 
