import React from 'react';
import { UseState, useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton';
import "react-datepicker/dist/react-datepicker.css";

const PopUpAddLocation = ( {trigger,setTrigger} ) => {
    //declarations
    const [txtLocName,setLocName] = React.useState("");
    const [txtLocAdd1,setLocAdd1] = React.useState("");
    const [txtLocAdd2,setLocAdd2] = React.useState("");
    const [txtLocCity,setLocCity] = React.useState("");
    const [txtLocState,setLocState] = React.useState("");
    const [txtLocZip,setLocZip] = React.useState("");    
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    /***************************************************** 
                    Axios Post
    ******************************************************/
    // Create Location
    const onSubmit = ( event ) => {
        //console.log(event);
        //console.log("Add Location, onSubmit()"); 
        //console.log("txtLocName:",txtLocName, "txtLocAdd1:", txtLocAdd1 , "txtLocAdd2:", txtLocAdd2, "txtLocCity:", txtLocCity, "txtLocState:",txtLocState,"txtLocZip:",txtLocZip);
        if (txtLocName == ""|| txtLocAdd1 == ""|| txtLocCity == ""|| txtLocState == ""|| txtLocZip == "") {
            setBoolError(true);
            setError("Please Fill out all the above Information.");
        }else{            
            Axios.post('https://telemedicine5a-backend.herokuapp.com/location/addLocation', {
                name:       txtLocName,
                address1:   txtLocAdd1,        
                address2:   txtLocAdd2,
                city:       txtLocCity,
                state:      txtLocState,
                zip:        txtLocZip,
            }).then((response) => {
                //console.log("Add Location, onSubmit(), response: ",response)
            }).catch((err) => {
                console.log(err)
            });

            //Cleanup
            setLocName("");
            setLocAdd1("");
            setLocAdd2("");
            setLocCity("");
            setLocState("");
            setLocZip("");
            setBoolError(false);
            setTrigger(false);
        }
    }    

    /***************************************************** 
                         HTML
    ******************************************************/

    return (    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Location"
        >    
            {/* Grid */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "35px 35px 35px 35px 35px 35px 35px 40px",
                    gridTemplateColumns: "150px 325px",
                }}
            >
                {/* Location Name */}
                <div className="popup_label_grid"
                    style={{                        
                        gridRow:1,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Location Name:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:1,
                        gridColumn:2,
                    }}
                >    
                    <input
                        type="text"
                        value={txtLocName}
                        onChange={e=>setLocName(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Address 1 */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:2,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Address 1:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:2,
                        gridColumn:2,
                    }}
                >    
                    <input
                        type="text"
                        value={txtLocAdd1}
                        onChange={e=>setLocAdd1(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Address 2 */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:3,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Address 2:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:3,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtLocAdd2}
                        onChange={e=>setLocAdd2(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* City */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:4,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">City:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:4,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtLocCity}
                        onChange={e=>setLocCity(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* State */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:5,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">State:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:5,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtLocState}
                        onChange={e=>setLocState(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>

                {/* Zip */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:6,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Zip:</h5>
                </div>
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:6,
                        gridColumn:2,
                    }}
                >
                    <input
                        type="text"
                        value={txtLocZip}
                        onChange={e=>setLocZip(e.target.value)}
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                    />
                </div>
                
                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:7,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                    }}
                >
                    <ObjButton                     
                        
                        text="Create"
                        onClick={e=>onSubmit(e)}
                    />
                </div>
            </div>
            
            {/* Button Error Message */}
            {boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                >{txtError}</p>
            }
        </PopUpWindow>
        
    )
}

export default PopUpAddLocation
