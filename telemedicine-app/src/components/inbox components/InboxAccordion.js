import React, {useState, useRef} from 'react';
import Chevron from '../inbox components/Chevron';
import ObjLink from '../Objects/ObjLink';
import PopUpReply from '../../pages/admin_portal/PopupPages/PopUpReply';
import './InboxAccordion.css';

function InboxAccordion(props) {

    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    

    const content = useRef(null);

    const [newPatientPopup, setnewPatientPopup] = React.useState(false);
    const newPatientClick = (e) => {
        console.log("Reply click", e);
        let bPop = !newPatientPopup;
        setnewPatientPopup(bPop);
        console.log("Popup is ", bPop);
    }

    function toggleAccordion(){
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
          );
          setRotateState(
            setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
          );  
    }

    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <h1 className="accordion__from">{props.from}</h1>
                <h1 className="accordion__title">{props.title}</h1>
                <h1 className="accordion__date">{props.date}</h1>
                <Chevron className={`${setRotate}`} width={10} fill="#777"/>
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion__content">
                <div
                    className="accordion__text"
                    dangerouslySetInnerHTML={{ __html: (props.body.slice(0,props.body.search("________"))) }}
                    
                />
                <ObjLink
                text="Reply"
                btnWidth="125px"
                onClick={e => newPatientClick(e)}
                doLink="false"
                

            />
            </div>
            <PopUpReply
                subject={props.title}
                message={props.body}
                trigger={newPatientPopup}
                setTrigger={setnewPatientPopup}
            />
        </div>
    );
}

export default InboxAccordion;