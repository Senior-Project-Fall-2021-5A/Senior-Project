import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Canvas from '../../components/Canvas'
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import './reports.css';
import { MoveColumnFeature } from 'ag-grid-community';
import Moment from 'moment';
import ObjLink from '../../components/Objects/ObjLink';





const tdStyle = {
    border: '1px solid #85C1E9',
    background: 'white',
    padding: '5px',
    width: '100%',
};

const thStyle = {

};



const Reports = () =>{
    const [listOfReports, setListOfReports] = useState([]);

    useEffect(() => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/reports/getReports')
            .then((response) => {
                console.log("reports:",response);
                setListOfReports(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get Reports");
            });
    }, []);


    return (
        <div class="title">
            <Canvas>
                <div className='reports-container'>
                    <h1>Patient Reports</h1>
                    <div className='reports-row'>
                        <table id="reports" class='table'>
                            <tbody>
                                <tr>
                                    <th className='reports-table_header_left'>Report</th>
                                    <th >Physician</th>
                                    <th >Date</th>
                                    <th className='reports-table_header_right'>View</th>
                                </tr>
                                {listOfReports.map((report) => {
                                    return (
                                        <tr key={report._id} >
                                        <td style={tdStyle}>{report.details}</td>
                                        <td style={tdStyle}>{report.doctor}</td>
                                        <td style={tdStyle}>{
                                            (new Date(report.date)).toLocaleDateString()
                                        }</td>
                                        <td style={tdStyle}>
                                            <ObjLink
                                                linkInfo = '/reportDisplay'
                                                text = "View"
                                                doLink = "true"
                                                data = {{
                                                    doctor: report.doctor, 
                                                    _id: report._id,
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Canvas>
        </div>


    );
};

export default Reports;
