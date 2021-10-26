import React from 'react'
import PropTypes from 'prop-types'
import ObjButton from './ObjButton';


const OBJPopUpInput = ( props) => {
    const [textInput, setTextInput] = React.useState("");

    const onTextChange = (event) => {
        //console.log(event);
        //console.log(event.target.value);
        setTextInput(event.target.value)
        //console.log(textInput);
    }
    const onSubmit = (event) => {
        console.log(event);
        console.log(textInput);
        setTextInput("");
        props.setTrigger(false);
    }
    
    return ( props.trigger) ? (
        <div className="objpopup-popup">
            <div className="objpopup-popup-inner">
                <button 
                    className="close-btn" 
                    onClick={()=> props.setTrigger(false)}
                >
                    close
                </button>
                { props.children }
                <input 
                    defaultValue={textInput}
                    type="text"    
                    onChange={e=>onTextChange(e)}                
                />
                <ObjButton                     
                    text="Submit"
                    onClick={e=>onSubmit(e)}
                />
            </div>
            
        </div>
    ) : "";
}

OBJPopUpInput.propTypes = {

}

export default OBJPopUpInput
