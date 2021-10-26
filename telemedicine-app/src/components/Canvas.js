import React from 'react'
import './Canvas.css'

const Canvas = ( props ) => {
    return (
        <div className='page-canvas-outer'>
            <div className='page-canvas-inner'>
                <div className='canvas'>
                    { props.children }
                </div>
            </div>
        </div>
    )
}

export default Canvas;
