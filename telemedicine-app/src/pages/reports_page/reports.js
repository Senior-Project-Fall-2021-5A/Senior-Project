import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import './reports.css';





const tdStyle = {
    border: '1px solid #85C1E9',
    background: 'white',
    padding: '5px',
    width: '100%',
};

const thStyle = {

};



function Reports() {  //const App = () =>
    const [listOfReports, setListOfReports] = useState([]);

    useEffect(() => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/reports/getReports')
            .then((response) => {
                console.log(response);
                setListOfReports(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get Reports");
            });
    }, []);


    return (
        <div class="title">
            <Navbar />
            <div className='page-canvas-outer'>
                <div className='page-canvas-inner'>
                    <div className='canvas'>
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
                                                <td style={tdStyle}>{report.date}</td>
                                                <td style={tdStyle}>
                                                    <Link to={`/reportDisplay/${report._id}`}>
                                                        <Button className='reports-table_button'>View</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </div>


    );
};

export default Reports;
