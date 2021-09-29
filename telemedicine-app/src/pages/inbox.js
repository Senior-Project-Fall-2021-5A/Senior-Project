import React from 'react'

//Not used yet
import {AgGridReact} from 'ag-grid-react';
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../components/Canvas.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

class Inbox extends React.Component{
    render() {
        return (
            
            <div class="title"> 
                <Navbar/>
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                            <h1>Inbox</h1>
                            <div class="wrapper">                                
                                
                            </div>
                        </div>
                    </div>                    
                </div>
                <Footer/>
            </div>
            // comment for pushing
            
            
            
        )
    }
}




export default Inbox;
