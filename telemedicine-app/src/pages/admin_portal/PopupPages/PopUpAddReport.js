import React from 'react'
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjLink from '../../../components/Objects/ObjLink'
import ObjInputFile from '../../../components/Objects/ObjInputFile'

const PopUpAddReport = ( {trigger,setTrigger} ) => {
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
                    header = "Add Report"
            >                
                <p
                    style={{
                        position:'relative',
                        left:"-193px",
                        top: "15px",
                    }}
                >Doctors Notes:</p>
                <textarea
                    defaultValue={textInput}
                    style={{width:"500px"}}
                    type="text"    
                    onChange={e=>onTextChange(e)}   
                />
                <ObjInputFile/>
                <ObjLink
                    text="Submit"
                    onClick={e=>onSubmit(e)}
                    btnWidth="100px"
                />
            </PopUpWindow>        
    )
}

export default PopUpAddReport
