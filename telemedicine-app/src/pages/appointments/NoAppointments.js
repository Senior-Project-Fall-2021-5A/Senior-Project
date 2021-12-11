import React, { useState, useEffect }  from 'react';
import './appointments.css';
import Axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import './Tabs.css';
import Chevron from '../../components/inbox components/Chevron.js'
import authUserObject from '../../middleware/authUserObject';
import moment from 'moment'; 
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router-dom';
import Canvas from "../../components/Canvas";
import 'reactjs-popup/dist/index.css';
import NotesPopUp from '../doctors/NotesPopUp.js';


function NoAppointments() {

    /***************************************************************
                        Declarations
    ***************************************************************/
    //am I used?
    const [listOfAppointments, setListOfAppointments] = useState([]);
    const [listOfLocations,setListOfLocations] = React.useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [cancel, setCancel] = useState('');
    var userId = String(authUserObject.userId)
    const [value,setValue] = useState();

    //declarations
    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [show, setShow] = useState("");
    const [toggleState, setToggleState] = useState(1);
    const [toggled, setToggled] = useState(false);
    const [date,setDate] = React.useState(new Date());
    const history = useHistory();

    /***************************************************************
                        Handlers
    ***************************************************************/

    useEffect(() => {
        getAppointments();
    }, []);

    /***************************************************************
                        Axios Get
    ***************************************************************/
    //get Appts
    const getAppointments = () => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${authUserObject.userId}`)
        .then((response) => {
            console.log("No Appnts response data:   ", response.data);
            setListOfAppointments(response.data);

            //declarations
            const past = [];
            const upcoming = [];
            var current = moment(date, 'mm-dd-yyyy').format();            
            var currDate = current.slice(0, 10);
            var currentTime = moment();
           // console.log("current time: " + currentTime);

           //startLoop
            for(let key in response.data) {        
                //var dataDate = response.data[key].date.slice(0, 10);
                var dataDate = response.data[key].date;

                //var apiDate = moment(response.data[key].date, 'mm-dd-yyyy').valueOf()
                var apiDateGet = response.data[key].date;
                var apiDate = apiDateGet.valueOf;

                //console.log("api date: " + apiDateGet);

          
               
                var apiTime = moment(response.data[key].time, "hh:mm a");
                console.log("apiTime: " + apiTime);
                
                 console.log("dataDate: " + dataDate);

                  console.log("currentTime: " + currentTime);

                  console.log("currDate: " + currDate);

                  console.log('\n');
                
                if(moment(currDate).isAfter(dataDate)) {

               
                    past.push(response.data[key]); 
                   
                           
				} 

                if(moment(currDate).isBefore(dataDate)) {
                    upcoming.push(response.data[key]);
                }

                if(moment(currDate).isSame(dataDate)) {
                     if(currentTime > apiTime) {
                        past.push(response.data[key]); 
                        
					} else {
                        upcoming.push(response.data[key]);
                       
					}
				} 
			}

            setPastAppointments(past.sort(byDate).reverse());
            setUpcomingAppointments(upcoming.sort(byDate));

            setDoctorsNames(upcoming);
            setPatientNames(upcoming);
            setLocationNames(upcoming);
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments");
        }, []);
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
                        console.log("setDoctorsNames() - name: ",name);
                    } else {
                        name = "unknown";
                    }

                    //add new column
                    e.doctorName = name;
                }).catch((err) => {
                    console.log(err, "Unable to get Doctors");
                });
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
    }

    //set Location Names
    const setLocationNames = ( arrData ) => {
        //console.log("setPatientNames() - arrData:",arrData);

        arrData.forEach(e=> {
            //console.log("e: ",e);
            let id = e.locationUID; //UID
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocation/${id}`)
                .then((response) => {
                    let data = response.data[0];
                    console.log("setLocationNames() - response:", data);

                    if(data){
                        console.log("something here");
                        e.officeName = data.name;
                        e.officeAddress1 = data.address1;
                        e.officeAddress2 = data.address2;
                        e.officeCity = data.city;
                        e.officeState = data.state;
                        e.officeZip = data.zip;
                    } else {
                        e.officeName = "Location Unknown";
                    }
                }).catch((err) => {
                    console.log(err, "Unable to get Locations");
                });
        });
    }

    /***************************************************************
                        Axios Post
    ***************************************************************/

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

    const triggerCancel = (apptId) => {       
        //console.log(apptId);
        
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/appointments/cancelAppt/${apptId}`)
            .then((response) => {
                //console.log("triggerCancel",response);
                
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
        window.location.reload();
	}
    /***************************************************************
                        Functions
    ***************************************************************/
    //Am I used?
    function handleOpen() {
       setShow(show === "" ? "active" : "");
	}
    const CreateRoom = (apptId) => {
        const id = uuid();
        history.push(`/room/${id}`);
        updateVirtualID(id, apptId);
    }

    //Used
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const toggleAccordion = (index) => {

        if(toggled === index){
          return setToggled(null);
        }
        setToggled(index);       
    }

    //Cancel appnt function
    

    function byDate(a, b) {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
	}

    const refreshPage = () => {
       window.location.reload();
	}
    
    /***************************************************************
                        HTML
    ***************************************************************/
    const styleBody = {
        fontSize:'18px',
        fontWeight: '600',
        marginLeft: 'auto',
        
    }

   return (
       <div className='appointments'>
           <Canvas>           
                <div className="appointmentContainer">
                    {/* Header and Refresh Button */}
                    <div className="refreshLabel"><h6>View New Appointment</h6></div>
                    
                    {/* Refresh */}
                    <div>
                        <Button className="refreshBtn" onClick={refreshPage}>
                            <i class="fas fa-redo-alt"></i>   
                        </Button>
                    </div>
                    
                    {/* Create New  */}
                    <Link to='/DoctorSearch'>
                        <Button className="button">
                            Create New <i class="fas fa-plus"></i>
                        </Button>
                    </Link>

                    {/* Tabs (Upcoming and Past) */}
                    <div className="bloc-tabs">

                        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                            Upcoming 
                        </button>

                        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                            Past
                        </button>

                    </div>

                    {/**************************************************************
                                        Upcoming Page
                    **************************************************************/}
                    <div className="content-tabs">

                        <div className={toggleState === 1 ? "content  active-content" : "content"}>

                            <h4>All Upcoming Appointments</h4>
                            <hr />

                            {upcomingAppointments.map((appointment, index) => {
                                return (                                    
                                    <div className="accordion1">
                                        
                                        {/* Header */}
                                        <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                            <h5 className="date">{(new Date(appointment.date)).toLocaleDateString()}</h5>
                                            <h5 className="time">{appointment.time}</h5>
                                            <h5 className="subject">{appointment.type}</h5>
                                           
                                                <div>
                                                    {toggled === index ? 
                                                        <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                        : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                                    }
                                                </div>
                                            
                                        </div>

                                        
                                        {/* Accordian Body */}
                                        {toggled === index && (
                                            <div className="accordion1-body">
                                            
                                                {/* Demographical Info */}
                                                <div className="patient">
                                                    <h1 style={styleBody}><b>Patient: </b> <i>{appointment.patientName}</i></h1>
                                                </div>
                                                <div className="doctor">
                                                    <h1 style={styleBody}><b>Doctor: </b> <i>{appointment.doctorName}</i></h1>
                                                </div>
                                                <div className="office_name">
                                                    <h1 style={styleBody}><i>{appointment.officeName}</i></h1>
                                                </div>
                                                <div className="address">
                                                    <h1 style={styleBody}><i>{appointment.officeAddress1} {appointment.officeAddress2}</i></h1>
                                                </div>
                                                <div className="cityzip">
                                                    {appointment.officeCity !== undefined  &&
                                                        <h1 style={styleBody}><i>{appointment.officeCity+", "}{appointment.officeState} {appointment.officeZip}</i></h1>
                                                    }
                                                </div>
                                                
                                                {/* Buttons */}
                                                {appointment.type === 'Virtual' ? 
                                                    <div className="accord_btn_call">
                                                    <Button variant="primary" href='https://video-chat-app-v1.herokuapp.com/' target='=_blank'>
                                                        Start Call
                                                    </Button>
                                                </div>
                                                : ''}
                                                <div className="accord_btn_cancel">
                                                    <button className="cancelBtn" onClick={()=>triggerCancel(appointment._id)}>Cancel</button>
                                                </div>
                                                <div className="accord_btn_note">
                                                    <NotesPopUp value={appointment.apptNotes} label="Notes"/>
                                                </div>
                                            </div>
                                        )}
                                    </div> 
                                );
                            })}
                        </div>

                        {/**************************************************************
                                    Past Page
                        **************************************************************/}
                        <div className={toggleState === 2 ? "content  active-content" : "content"}>

                        <h4>All Past Appointments</h4>
                        <hr />
                        {pastAppointments.map((appointment, index) => {
                            return (                                
                                <div className="accordion1">
                                    
                                    {/* Header */}
                                    <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                        <h5 className="date">{appointment.date}</h5>
                                        <h5 className="time">{appointment.time}</h5>
                                        <h5 className="subject">{appointment.type}</h5>
                                        
                                        {/* Arrow in corner */}
                                        <div>
                                            {toggled === index ? 
                                                <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                            }
                                        </div>
                                        
                                    </div>
                                    
                                    
                                    
                                    {toggled === index && (

                                        <div className="accordion1-body">

                                            <div className="patient">
                                                <h1 style={styleBody}><b>Patient: </b> <i>{appointment.patientName}</i></h1>
                                            </div>
                                            <div className="doctor">
                                                <h1 style={styleBody}><b>Doctor: </b> <i>{appointment.doctorName}</i></h1>
                                            </div>
                                            <div className="office_name">
                                                <h1 style={styleBody}><i>{appointment.officeName}</i></h1>
                                            </div>
                                            <div className="address">
                                                <h1 style={styleBody}><i>{appointment.officeAddress1} {appointment.officeAddress2}</i></h1>
                                            </div>
                                            <div className="cityzip">
                                                {appointment.officeCity !== undefined  &&
                                                    <h1 style={styleBody}><i>{appointment.officeCity+", "}{appointment.officeState} {appointment.officeZip}</i></h1>
                                                }
                                            </div>
                                            <div className="accord_btn_cancel">
                                                <button className="cancelBtn" onClick={()=>triggerCancel(appointment._id)}>Cancel</button>
                                            </div>
                                            <div className="accord_btn_note">
                                                <NotesPopUp value={appointment.apptNotes}/>
                                            </div>
                                        </div>
                                    )}
                                
                                </div> 
                            );
                        })} 
                        
                            
                        </div>

                    </div>
                </div>
           
            </Canvas>
       </div>

   )


}

export default NoAppointments;