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


const ReportDisplay = (props) => {
    
    // Convert data string from ObjLink back into an Object
    const location = useLocation();
    const {data} = location.state;
    let reports = JSON.parse(data);    
    //console.log("data",data,"reports",reports);    

    return (
        <div class="title"> 
            <Canvas>
                <div>
                    <h1>
                        Test
                    </h1>
                    <p>
                       {reports.doctor}
                    </p>
                </div>
            </Canvas>
        </div>        
    )  
}

export default ReportDisplay; 
