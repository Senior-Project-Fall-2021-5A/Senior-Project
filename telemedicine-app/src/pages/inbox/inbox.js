import React from 'react'
import { UseState, useEffect } from 'react';
import Axios from 'axios';
import "./inbox.css";
import Navbar from '../../components/Navbar/Navbar';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas.css';
import Footer from '../../components/Footer/Footer';
import Top from "../../components/inbox components/Top"
import InboxAccordion from '../../components/inbox components/InboxAccordion'
import { Link } from 'react-router-dom';
import Canvas from '../../components/Canvas'
import authUserObject from '../../middleware/authUserObject';
import $ from 'jquery';


$(document).ready(function(){
    $('.canvas').slideDown(400);
});



const Inbox = () => {

    const [listOfMessages, setMessages] = React.useState([]);
    const [listOfDoctors, setName] = React.useState([]);
    const [senderID, setSenderID] = React.useState("");




    useEffect(() => {
        getMessages();
        // CreateListOfDoctors();



    }, []);

    const getMessages = () => {

        Axios.get(`https://telemedicine5a-backend.herokuapp.com/inbox/getMessages/${authUserObject.userId}`)////${txtGlobalUserID}
            .then((response) => {
                console.log("Response Data: ", response.data);
                let arrMessage = response.data;
                console.log("apptData: ", arrMessage);
                setTheNames(arrMessage);
            })
            .catch((err) => {
                console.log(err, "Unable to get Messages");
            });
    }

    const setTheNames = (arrMessage) => {
        let newList = [];
        arrMessage.forEach(e => {
            let id = e.senderID;
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {
                    let data = response.data;
                    console.log("setTheNames() - response:", data);

                    let name = data[0].lastName + ", " + data[0].firstName;
                    console.log("setTheNames() - name:", name);

                    e.senderName = name;
                    console.log("setTheNames() - e.senderName:", e.senderName);

                    console.log("setTheNames() - arrMessage: ", arrMessage);
                    newList = [...newList, e];

                    setMessages(newList);

                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
        });




    }



    // const CreateListOfDoctors = () => {
    //     Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
    //         .then((response) => {
    //             let data = response.data;
    //             console.log("response:", data);
    //             data.forEach(e => {
    //                 setName(listOfDoctors => [...listOfDoctors, {
    //                     label: e.lastName + ", " + e.firstName + " [" + e.userUID.slice(-4) + "]",
    //                     value: e.userUID,
    //                 }]
    //                 )
    //             });
    //         }).catch((err) => {
    //             console.log(err, "Unable to get Doctors");
    //         });
    // }


    // {
    //     listOfDoctors.map((doctorIDs) => {
    //         let doctorName = doctorIDs.firstName
    //         console.log("Look here: ", doctorName)
    //     })
    // }

    $(document).ready(function(){
        $('.canvas').slideDown(200);
    });





    return (

        <div class="title">
            <Canvas>
                <Top />
                {/* <AccordionCustom />  */}
                <div className='inbox-body-container'>

                    <div className="inbox-body">
                        {listOfMessages.map((Message => (
                            <InboxAccordion


                                // Name
                                from={Message.senderName}

                                // Put Subject
                                title={Message.subject}

                                // Date will go here
                                date={(new Date(Message.date)).toLocaleDateString()}

                                // Message will go here
                                body={Message.body}

                            />
                        )))}
                    </div>

                </div>

                {/* <Accordion /> */}

            </Canvas>
        </div>

    );
}





export default Inbox;
