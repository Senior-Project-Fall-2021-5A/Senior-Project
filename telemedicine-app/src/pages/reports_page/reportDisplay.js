import React from 'react'
import './reports.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas';
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
    console.log("data",data,"reports",reports.doctor, reports._id, reports.date, reports.details, reports.fileName);    
    
    //      Set sheet values using Data from Reports
    const [sReportID, setReportID] = React.useState(reports._id);
    const [sDoctor, setDoctor] = React.useState(reports.doctor);
    const [sDetails, setDetails] = React.useState(reports.details);
    const [sFileName, setFileName] = React.useState(reports.fileName);
    const [dDate, setDate] = React.useState(new Date(reports.date));

    console.log("_id:",sReportID,"doctor:",sDoctor,"dDate:",dDate);

    //      Set page values using Data from DB            
    const [fPDF, setPDF] = React.useState(Pdf);
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
                    Uploaded on: {dDate.toLocaleDateString()} @ {dDate.toLocaleTimeString()}<br/>
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
                </p>                
            </Canvas>
        </div>        
    )  
}

export default ReportDisplay; 
