import React from 'react'
import PropTypes from 'prop-types'
import ObjButton from './ObjButton'
import { Link } from 'react-router-dom';

const ObjLink = ({ linkInfo, text, onClick, doNewWindow, doLink, data, btnHeight, btnWidth}) => {
    
    // Should this button Link ("true"), or send to the same page ("false").
    doLink = (doLink === "true");
    doNewWindow = (doNewWindow === "true");
    const doBtnHeight = (btnHeight != null);
    const doBtnWidth = (btnWidth != null);
    //console.log("doLink:",doLink,"doNewWindow",doNewWindow, "doBtnHeight:", doBtnHeight, "doBtnWidth:", doBtnWidth);
    
    
    // Turn data into a string to pass to another page (see report.js to reportDisplay.js for structure)
    const dataString = JSON.stringify(data);    
    //console.log("dataString", dataString);
    
    if (doLink) {
        return (
            <Link
                to = {{
                    pathname: `${linkInfo}`,
                    state: { data: `${dataString}`},
                }}
                target={doNewWindow ? '_blank' : '_self'}
            >
                <ObjButton
                    text={text}
                    onClick={onClick}
                    nHeight={btnHeight}
                    nWidth={btnWidth}
                />
            </Link>
        )
    } else {
        return(
            <ObjButton
                text={text}
                onClick={onClick}
                nHeight={btnHeight}
                nWidth={btnWidth}
            />
        )
    }
}

ObjLink.defaultProps = {
    doNewWindow: "false",
    doLink: "true",
}

ObjLink.propTypes = {
    linkInfo: PropTypes.string,     //This should be a direct to a page in the project
    text: PropTypes.string,         //This is what the button should read
    onClick: PropTypes.func,        //Function for onClick (if used)
    doNewWindow: PropTypes.string,  //If you want this to open in a new window
    doLink: PropTypes.string,       //If you want the button to link
    data: PropTypes.object,         //On Link, what data do you wish to pass along.
    btnHeight: PropTypes.string,    //To set a Height for Button
    btnWidth: PropTypes.string,     //To set a Width for Button
    sPosition: PropTypes.string,     //To set a Width for Button
    sLeft: PropTypes.string,     //To set a Width for Button
    sRight: PropTypes.string,     //To set a Width for Button
    sTop: PropTypes.string,     //To set a Width for Button
    sBottom: PropTypes.string,     //To set a Width for Button

}

export default ObjLink
