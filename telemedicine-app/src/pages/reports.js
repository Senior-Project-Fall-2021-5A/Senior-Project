import React from 'react'
import './reports.css';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';
import '../components/Canvas.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';


class Reports extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Report', field: 'report', sortable: true},
                {headerName: 'Physician', field: 'physician', sortable: true},
                {headerName: 'Date', field: 'date', sortable: true},
            ],
            rowData: [
                {report: 'Test tester test', physician: 'Dr Who', date: '09/15/2021'},
                {report: 'Time Machine', physician: 'Dr Brown', date: '09/05/2021'},
                {report: 'McTesty Test', physician: 'Dr House', date: '09/11/2021'},
            ]
        };

    }

    onButtonClick = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.report + ' ' + node.physician + ' ' + node.date).join(', ');
        alert(`Selected Nodes: ${selectedDataStringPresentation}`);
    }

    onCellClick = () =>{        
        let path = '/reportDisplay';
        this.props.history.push(path);
    }

    render() {
        return (
            
            <div class="title"> 
                <Navbar/>
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                            <h1>Patient Reports</h1>
                            <div class="wrapper">                                
                                <div
                                    className="ag-theme-balham"
                                    
                                    style={{
                                        
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        width: 603,
                                        height: 500
                                    }}
                                    >
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.rowData}
                                        rowSelection='multiple'
                                        onGridReady={params => (this.gridApi = params.api)}
                                        onCellClicked={this.onCellClick}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <Footer/>
            </div>
            
            
            
        )
    }
}


export default Reports;
