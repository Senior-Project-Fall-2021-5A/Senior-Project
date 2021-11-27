import React from 'react'
import PropTypes from 'prop-types'

const OBJPopUpInput = ( props ) => {
    return ( props.trigger ) ? (
        <div className="objpopup-popup">            
            <div className="objpopup-popup-inner">
                
                <button 
                    className="close-btn" 
                    onClick={()=> props.setTrigger(false)}
                >
                    close
                </button>
                <h1>{props.header}</h1>
                { props.children }
                
            </div>            
        </div>
    ) : "";
}

OBJPopUpInput.propTypes = {

}

export default OBJPopUpInput
