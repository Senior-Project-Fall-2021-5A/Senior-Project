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
import authUserObject from '../../middleware/authUserObject';



const tdStyle = {
    border: '1px solid #85C1E9',
    background: 'white',
    padding: '5px',
    width: '100%',
};

const thStyle = {

};

const Reports = () =>{
    //declarations
    const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
    const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
    const [listOfReports, setListOfReports] = useState([]);

    useEffect(() => {
        //console.log("Page Open: ",txtGlobalUserID);
        getReports();
    }, []);

    //get Reports
    const getReports = () => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/reports/getReports/${authUserObject.userId}`)
            .then((response) => {
                //console.log("reports:",response);
                let arrData = response.data;
                arrData.forEach(e=> {
                    //console.log("check e.date: (>0,date,string)", e.date);
                    if(e.date instanceof Date){
                         //console.log("date good")
                    } else if (typeof e.date === String){
                        if (new Date(e.date) instanceof Date){
                            e.date = new Date(e.date);
                        } else {
                            e.date = new Date(e.date.split('-').join('/'));
                        }
                    } else {
                        e.date = new Date();
                    }
                    
                })
                setDoctors(arrData); // send to lop to get doctors
            })
            .catch((err) => {
                console.log(err, "Unable to get Reports");
            });
    }

    //set Doctors
    const setDoctors = ( arrData ) => {
        //console.log("arrData - ",arrData);
        let newList = [];
        arrData.forEach(e => {
            //console.log("e: ",e);
            let id = e.doctorUID; //set ID to doctor
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {
                    let data = response.data;
                    //console.log("setTheNames() - response:", data);

                    let name = "";
                    if (data[0]){
                        name = data[0].lastName + ", " + data[0].firstName;
                        //console.log("setTheNames() - name:", name);
                    } else {
                        name = "unknown";
                    }

                    e.doctorName = name;
                    //console.log("setTheNames() - e.doctorName:", e.doctorName);

                    console.log("setTheNames() - arrData: ", arrData);
                    newList = [...newList, e];

                    setListOfReports(newList);
                }).catch((err) => {
                    console.log(err, "Unable to set Names of Doctors");
                });
            });        
    }    


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
                                            <td style={tdStyle}>{report.doctorName}</td>
                                            <td style={tdStyle}>{
                                                (new Date(report.date)).toLocaleDateString()
                                            }</td>
                                            <td style={tdStyle}>
                                                <ObjLink
                                                    linkInfo = '/reportDisplay'
                                                    text = "View"
                                                    doLink = "true"
                                                    btnWidth = "100px"
                                                    data = {{
                                                        doctor: report.doctorName, 
                                                        _id: report._id,
                                                        date: report.date,
                                                        details: report.details,
                                                        fileName: report.fileName,
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
