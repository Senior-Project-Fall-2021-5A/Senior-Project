import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton';

const PopUpAddNotes = ( {trigger,setTrigger, AptInfo} ) => {
    const [textInput, setTextInput] = React.useState("");

    const onTextChange = (event) => {
        //console.log(event);
        //console.log(event.target.value);
        setTextInput(event.target.value)
        //console.log(textInput);
    }
    const onSubmit = (event) => {
        //console.log(event);
        //console.log(textInput);
        
        AptInfo.txtNotes = textInput;
        //console.log("AptInfo: ",AptInfo);
        updateNotes(AptInfo);
        
        setTextInput("");
        setTrigger(false);
    }

    const updateNotes = (AptInfo) => {
        let id = AptInfo._id;
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/updateApptInfo/${id}`, {
            apptNotes: AptInfo.txtNotes,
        }).then(response => {
            //console.log('updateNotes() - Success: ', response);            
        }).catch((err) => {
            console.log(err)
        })
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
