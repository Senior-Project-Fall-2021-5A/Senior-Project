import React from 'react'
import PropTypes from 'prop-types'
import './objects.css'

const ObjButton = ({ text, onClick, nHeight, nWidth}) => {
    
    //const doHeight = (nHeight != null);
    //const doWidth = (nWidth != null);
    //console.log("text:",text,"onClick:",onClick,"nHeight:",nHeight,"nWidth:",nWidth);

    return (
        <button
            style = {{
                height: `${nHeight}`,
                width: `${nWidth}`,
            }}
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
