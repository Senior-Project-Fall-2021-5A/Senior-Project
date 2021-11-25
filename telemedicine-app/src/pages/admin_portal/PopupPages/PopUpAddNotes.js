import React from 'react'
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpAddNotes = ( {trigger,setTrigger} ) => {
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
        setTrigger(false);
    }
    
    return (
    
            <PopUpWindow
                    trigger = {trigger}
                    setTrigger = {setTrigger}
                    header = "Add Notes"
            >                
                <textarea
                    defaultValue={textInput}
                    style={{width:"500px"}}
                    type="text"    
                    onChange={e=>onTextChange(e)}   
                />
                <ObjButton                     
                    text="Submit"
                    onClick={e=>onSubmit(e)}
                />
            </PopUpWindow>
        
    )
}

export default PopUpAddNotes
