import React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Button } from 'react-bootstrap'

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
    const report_data = [
        {guid: 1, report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
        {guid: 2, report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
        {guid: 3, report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
        {guid: 1, report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
        {guid: 2, report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
        {guid: 3, report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
        {guid: 1, report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
        {guid: 2, report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
        {guid: 3, report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
        {guid: 1, report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
        {guid: 2, report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
        {guid: 3, report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
        {guid: 1, report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
        {guid: 2, report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
        {guid: 3, report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
        
        

    ];

    

    return (
        <div class="title"> 
            <Navbar/>
            <div className='page-canvas-outer'>
                <div className='page-canvas-inner'>
                    <div className='canvas'>
                        <div className='reports-container'>
                            <h1>Patient Reports</h1>
                            <div className = 'reports-row'>                            
                                <table id="reports" class='table'>
                                    <tbody>
                                        <tr>
                                            <th className='reports-table_header_left'>Report</th>
                                            <th >Physician</th>
                                            <th >Date</th>
                                            <th className='reports-table_header_right'>View</th>
                                        </tr>
                                        {report_data.map(({ guid, report, physician, date }) => (
                                            <tr key={guid} >
                                                
                                                <td style={tdStyle}>{report}</td>
                                                <td style={tdStyle}>{physician}</td>
                                                <td style={tdStyle}>{date}</td>
                                                <td style={tdStyle}>
                                                    <Link to={`/reportDisplay/${guid}`}>                                                 
                                                            <Button className='reports-table_button'>View</Button>                                                
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                       

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
      
      
    );
};

export default Reports;
