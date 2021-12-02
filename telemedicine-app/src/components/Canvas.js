import React from 'react'
import './Canvas.css'
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

const Canvas = ( props ) => {
    return (
        <div>
            <Navbar/>
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                        <div className='canvas-container'>
                            { props.children }
                        </div>
                        </div>
                    </div>
                </div>
            <Footer/>            
        </div>
    )
}

export default Canvas;
