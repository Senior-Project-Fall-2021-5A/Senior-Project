import React from 'react'
import PropTypes from 'prop-types'
import './objects.css'

const ObjButton = ({ text, onClick}) => {
    
    return (
        <button
            onClick={onClick}            
            className='objbutton'
        >
            {text}
        </button>
    )
}

ObjButton.defaultProps = {
   
}

ObjButton.propTypes = {
    text: PropTypes.string,    
    onClick: PropTypes.func,
}

export default ObjButton
