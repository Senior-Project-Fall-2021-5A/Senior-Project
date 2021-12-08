import React, { useState, useEffect }  from 'react';
import './appointments.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import './Tabs.css';
import Chevron from '../../components/inbox components/Chevron.js'
import authUserObject from '../../middleware/authUserObject';
import moment from 'moment'; 
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router-dom';


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import NotesPopUp from '../doctors/NotesPopUp.js';


function NoAppointments() {
    //declarations
    
    const [listOfLocations,setListOfLocations] = React.useState([]);
    
    const [show, setShow] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory();
    const [toggleState, setToggleState] = useState(1);
    const [toggled, setToggled] = useState(false);
    const [date,setDate] = React.useState(new Date());
    const [cancel, setCancel] = useState('');

    /***************************************************** 
                    Handlers
    ******************************************************/
    //On Open
    useEffect(() => {
        getAppointments();
    }, []);

    /***************************************************** 
                    Am I used???
    ******************************************************/
    function handleOpen() {
       setShow(show === "" ? "active" : "");
	}

    const CreateRoom = (apptId) => {
        const id = uuid();
        history.push(`/room/${id}`);
        updateVirtualID(id, apptId);
    }

    /***************************************************** 
                    Functions
    ******************************************************/
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const toggleAccordion = (index) => {

        if(toggled === index){
          return setToggled(null);
        }
    
        setToggled(index);       
    }

    /***************************************************** 
                    Axios Post
    ******************************************************/

    const updateVirtualID = (virtualID, apptId) => {
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/updateApptInfo/${apptId}`, {
            virtualID: virtualID,
        }).then(response => {
            console.log('ID to update with', virtualID)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    /***************************************************** 
                    Axios Get
    ******************************************************/
    //Get Appointments by ID
    const [listOfAppointments, setListOfAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const getAppointments = (  ) => {
        setListOfAppointments([]);
        setPastAppointments([]);
        setUpcomingAppointments([]);
        let arrData = [];
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${authUserObject.userId}`)        
            .then((response) => {                
                arrData = response.data;           
                //console.log("getAppointments() - response:",arrData);

                //send to get Patient Names
                setPatientNames(arrData);
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
            
            
    }

    //set Patient Name
    const setPatientNames = ( arrData ) => {
        //console.log("setPatientNames() - arrData:",arrData);

        arrData.forEach(e=> {
            //console.log("e: ",e);
            let id = e.userUID; //UID
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {
                    let data = response.data;
                    //console.log("setPatientNames() - response:", data);

                    //set Name
                    let name = "";
                    if (data[0]){
                        name = data[0].lastName + ", " + data[0].firstName;
                        //console.log("setPatientNames() - name: ",name);
                    } else {
                        name = "unknown";
                    }

                    //add new column
                    e.patientName = name;

                    
                }).catch((err) => {
                    console.log(err, "Unable to get Patients");
                });
        });
        //check array
        console.log("setPatientNames() - Updated arrData: ",arrData);
        //send to get Doctors Names
        setDoctorsNames(arrData);
    }

    //set Doctors Names
    const setDoctorsNames = ( arrData ) => {
        //console.log("setDoctorsNames() - arrData:",arrData);

        arrData.forEach(e=> {
            //console.log("e: ",e);
            let id = e.doctorUID; //UID
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
                .then((response) => {
                    let data = response.data;
                    //console.log("setDoctorsNames() - response:", data);

                    //set Name
                    let name = "";
                    if (data[0]){
                        name = data[0].lastName + ", " + data[0].firstName;
                        //console.log("setDoctorsNames() - name: ",name);
                    } else {
                        name = "unknown";
                    }

                    //add new column
                    e.doctorName = name;

                    

                }).catch((err) => {
                    console.log(err, "Unable to get Doctors");
                });
        });
        //check array
        console.log("setDoctorsNames() - Updated arrData: ",arrData);
        //send to get Location Fields
        setLocationName(arrData);
    }

    //set Location Names
    const setLocationName = ( arrData ) => {
        //console.log("setLocationName() - arrData:",arrData);

        arrData.forEach(e=> {
            //console.log("e: ",e);
            let id = e.locationUID; //UID
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocation/${id}`)
                .then((response) => {
                    let data = response.data;
                    //console.log("setLocationName() - response:", data);

                    //set Name
                    let name = "";
                    if (data[0]){
                        name = data[0].name + " in " + data[0].city + data[0].zip;
                        //console.log("setLocationName() - name: ",name);
                    } else {
                        name = "unknown";
                    }

                    //add new column
                    e.locationName = name;

                    

                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
        });
        //check array
        console.log("setLocationName() - Updated arrData: ",arrData);
        //send to get Location Fields
        setApptLists(arrData);
    }

    const setApptLists = (arrData) => {
        console.log("setLocationName() - arrData:",arrData);

        //declarations
        const past = [];
        const upcoming = [];
        var current = moment(date, 'mm-dd-yyyy').format();
        var currDate = current.slice(0, 10);
        var currentTime = moment();
        // console.log("current time: " + currentTime);

        // loop through arrays and place them in the correct bucket
        for(let key in arrData) {
    
            var dataDate = arrData[key].date.slice(0, 10);

            var apiDate = moment(arrData[key].date, 'mm-dd-yyyy').valueOf()
            console.log("api date: " + arrData[key].date);

        
            
            var apiTime = moment(arrData[key].time, "hh:mm a");
            console.log("apiTime: " + apiTime);
            
                console.log("dataDate: " + dataDate);

                console.log("currentTime: " + currentTime);

                console.log("currDate: " + currDate);

                console.log('\n');
            
            if(moment(currDate).isAfter(dataDate)) {

            
                past.push(arrData[key]); 
                
                        
            } 

            if(moment(currDate).isBefore(dataDate)) {
                upcoming.push(arrData[key]);
            }

            if(moment(currDate).isSame(dataDate)) {
                    if(currentTime > apiTime) {
                    past.push(arrData[key]); 
                    
                } else {
                    upcoming.push(arrData[key]);
                    
                }
            } 
        }
        //check array
        console.log("setApptLists() - Updated past: ",past);
        console.log("setApptLists() - Updated upcoming: ",upcoming);

        setPastAppointments(past);
        setUpcomingAppointments(upcoming);
    }
     

    

    


    //Cancel appnt function

    const triggerCancel = (e) => {
       
        console.log(e);
        setCancel(e);
        

	}
    

   return (

       

       <div className='appointments'>
           <Navbar/>
               <div className='Appointments-container-outer'>
                   <div className='Appointments-container-inner'>
                       <div className='Appointments-card'>


                          <Link to='/DoctorSearch'>
                              <Button className="button">
                                 Create New
                              </Button>
                          </Link>

                        
                          <div className="bloc-tabs">

                            <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                                Upcoming 
                            </button>

                            <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                                Past
                            </button>
        
                          </div>


                          <div className="content-tabs">

                             <div className={toggleState === 1 ? "content  active-content" : "content"}>

                                <h4>All Upcoming Appointments</h4>
                                <hr />

                                {upcomingAppointments.map((appointment, index) => {

                                    var sDate = appointment.date;
                                    var dateSlice = sDate.slice(0, 10);
                                    var year = dateSlice.slice(0, 4);
                                    var month = dateSlice.slice(5, 7);
                                    var day = dateSlice.slice(8, 10);
                                    var currApptId = appointment._id;

                                    var returnDate = month + "-" + day + "-" + year;
                              
                                    return (
                                        
                                        <div className="accordion1">
                    
                                            <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                                <h5 className="date">{returnDate}</h5>
                                                <h5 className="time">{appointment.time}</h5>
                                                <h5 className="subject">{appointment.type}</h5>
                                               
                                                
                                                <b>
                                                    {toggled === index ? 
                                                        <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                        : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                                    }
                                                </b>
                                                
                                            </div>

                                          
                                          
                                            {toggled === index && (

                                                <div className="accordion1-body">
                                                
                                                    <h1 className="patient">Patient: {appointment.patientName}</h1>
                                                    <h1 className="doctor">Doctor: {appointment.doctorName}</h1>
                                                    <h1 className="address">Location: {appointment.locationName}</h1>
                                                    
                                                    {appointment.type === 'virtual' ? 
                                                        <h1><button className="btnCall" onClick={() => CreateRoom(currApptId)}>Start Call</button></h1>
                                                         : ''}
                                                    
                                                     
                                                    <h1><button className="cancelBtn" onClick={()=>triggerCancel(appointment._id)}>Cancel</button></h1>
                                                    <NotesPopUp
                                                    value={appointment.appntNotes}
                                                    />
                                               
                             
                                                </div>
                                            )}
                                        
                                        </div> 
                                    );
                                })}
                             </div>


                             <div className={toggleState === 2 ? "content  active-content" : "content"}>

                                <h4>All Past Appointments</h4>
                                <hr />

                                  {pastAppointments.map((appointment, index) => {

                                    var sDate = appointment.date;
                                    var dateSlice = sDate.slice(0, 10);
                                    var year = dateSlice.slice(0, 4);
                                    var month = dateSlice.slice(5, 7);
                                    var day = dateSlice.slice(8, 10);

                                    var returnDate = month + "-" + day + "-" + year;
                                    //  <button onClick={CreateRoom(currApptId)} className="btnCall">Start Call</button>  
                                    return (
                                        
                                        <div className="accordion1">
                    
                                            <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                                <h5 className="date">{returnDate}</h5>
                                                <h5 className="time">{appointment.time}</h5>
                                                <h5 className="subject">{appointment.type}</h5>
                                             
                                                
                                                <b>
                                                    {toggled === index ? 
                                                        <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                        : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                                    }
                                                </b>
                                                
                                            </div>
                                           
                                            
                                          
                                            {toggled === index && (

                                                <div className="accordion1-body">
                                                
                                                    <h1 className="patient">Patient: {appointment.patientName}</h1>
                                                    <h1 className="doctor">Doctor: {appointment.doctorName}</h1>
                                                    <h1 className="address">Location: {appointment.locationName}</h1>
                                                    
                                                    <Link to='/client'>
                                                        <h1>
                                                        <button className="btnCall">Start Call</button>     
                                                        </h1>
                                                    </Link>
                                                    
                                                     
                                                    <h1><button className="cancelBtn" onClick={()=>triggerCancel(appointment._id)}>Cancel</button></h1>
                                                    <NotesPopUp
                                                    value={appointment.appntNotes}
         
                                                    />
                                                    
                             
                                                </div>
                                            )}
                                        
                                        </div> 
                                    );
                                })} 
                                
                                   
                             </div>

                           </div>

                       </div>

                   </div>

               </div>

           <Footer/>

       </div>

   )


}

export default NoAppointments;