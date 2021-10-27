import React from 'react'
import PropTypes from 'prop-types'
import ObjButton from './ObjButton'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Link } from 'react-router-dom';

const ObjLink = ({ linkInfo, text, onClick, doNewWindow, doLink }) => {
        
    return (
        <Link 
            to={doLink ? {linkInfo} : window.location.pathname}
            target={doNewWindow ? '_blank' : '_self'}
        >
            <ObjButton                
                text={text}
                onClick={onClick}
            />
        </Link>
    )
}

ObjLink.defaultProps = {
    doNewWindow: false,
    doLink: true,
}

ObjLink.propTypes = {
    linkInfo: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    doNewWindow: PropTypes.bool,
}

export default ObjLink
