import React from 'react'
import './reports.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../components/Canvas.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';


class ReportDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //adding column definitions and Row Data. We will replace the RowData with a call to the server, whenever that happens. 
            columnDefs: [
                {headerName: 'Test', field: 'test', sortable: true},
                {headerName: 'Value', field: 'value', sortable: true},
                {headerName: 'Flag', field: 'flag', sortable: true},
            ],
            rowData: [
                {test: 'Blood', value: 'Yep', flag: 'Good'},
                {test: 'Brain', value: 'Nope', flag: 'Bad'},
            ]
        };

    }


    render() {
        return (
            <div class="title"> 
                <Navbar/>
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                            <div className='report-frame'>
                                <h1>Result Details</h1>

                                <p>This is information about the test</p>

                                <h3>Results for your review:</h3>

                                <div class="wrapper">
                                    <div
                                        className="ag-theme-balham"                        
                                            style={{
                                                
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                width: 603,
                                                height: 400
                                            }}
                                        >

                                        <AgGridReact
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.rowData}
                                            onGridReady={params => (this.gridApi = params.api)}
                                        />
                                    </div>

                                </div>
                                <h2>General Information</h2>
                                <p>Physician: Bob the Dob</p>
                                <p>Address: 1234 56th place, Acworth, GA 30101</p>
                            </div>
                        </div>
                    </div>
                               
                </div>
                <Footer/>
            </div>
            
                
            
            
            
        )
    }
}


export default ReportDisplay; 
