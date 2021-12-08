import React from "react";
import Title from "./Title";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ObjLink from '../Objects/ObjLink';
import PopUpComposeMessage from '../../pages/admin_portal/PopupPages/PopUpComposeMessage';

function Top() {

    //New Patient Popup handler
    const [newPatientPopup, setnewPatientPopup] = React.useState(false);
    const newPatientClick = (e) => {
        console.log("New Patient Click");
        console.log("click", e);
        let bPop = !newPatientPopup;
        setnewPatientPopup(bPop);
        console.log("Popup is ", bPop);
    }
    return (<div style={{
        
        justifyContent: 'space-between'
    }}>
        <Title />
        {/* New Patient Button  */}
        <div
            style={{
                display: 'flex',
                position: 'relative',
                left: '-10px',
                justifyContent: 'flex-end',
                top: '-40px'
            }
            
        }
        >
            <ObjLink
                text="Compose Message"
                btnWidth="125px"
                onClick={e => newPatientClick(e)}
                doLink="false"
                

            />
        </div>
        {/* Compose Message */}
        <div>
            <PopUpComposeMessage
                trigger={newPatientPopup}
                setTrigger={setnewPatientPopup}
            />
        </div>

    </div>);
}

export default Top;