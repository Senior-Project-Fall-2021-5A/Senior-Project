import React, {useState, useEffect} from 'react';
import DoctorData from '../doctors/DoctorData';
import '../appointments/appointments.css';
import {Link} from "react-router-dom";
import {Card, Button} from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment';
import './doctors.css';
import Axios from 'axios';
import img1 from './avatar_placeholder.png';
import { Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ObjButton from '../../components/Objects/ObjButton';
import PopUpWindow from '../../components/Objects/ObjPopUpWindow';
import ObjLink from '../../components/Objects/ObjLink';
import authUserObject from '../../middleware/authUserObject';

const DoctorSearch = ( {trigger,setTrigger} ) => {
	/**********************************************************
					Declarations
	**********************************************************/
	//Used????
	const [filter, setFilter] = useState('');
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const [listOfApprovedDocFamily, setlistOfApprovedDocFamily] = React.useState([]);
	const [myDocs, setMyDocs] = useState([]);
	var listy = [];
	const [listOfNewDocs, setListOfNewDocs] = useState([]);
	const [docEle, setDocEle] = useState({});

	//Keep
	const [isMobile, setIsMobile] = useState(false);
	const [listOfDoctors, setListOfDoctors] = useState([]);
	const [textTime,setTime] = React.useState("");
	const [typeSelect,setTypeSelect] = React.useState("");
	const [showLocation, setShowLocation] = useState(false);
	const [txtLocation,setLocation] = React.useState("");
	const [listOfLocations,setListOfLocations] = React.useState([]);
	const [date,setDate] = React.useState(new Date());
	var userId = String(authUserObject.userId);
	const [txtLocSelect,setLocSelect] = React.useState("");
	const [doctorID, setDoctorID] = useState('');
	const [apptInputPopup, setApptInputPopup] = React.useState(false);

	//Time Defaults
    const listOfTimes =[
        {
            label: "09:00 am",
            value: "09:00 am",
        },   
        {
            label: "09:30 am",
            value: "09:30 am",
        },     
        {
            label: "10:00 am",
            value: "10:00 am",
        },
        {
            label: "10:30 am",
            value: "10:30 am",
        },
        {
            label: "11:00 am",
            value: "11:00 am",
        },
        {
            label: "11:30 am",
            value: "11:30 am",
        },
        {
            label: "12:00 pm",
            value: "12:00 pm",
        },
        {
            label: "12:30 pm",
            value: "12:30 pm",
        },
        {
            label: "01:00 pm",
            value: "01:00 pm",
        },
        {
            label: "01:30 pm",
            value: "01:30 pm",
        },
        {
            label: "02:00 pm",
            value: "02:00 pm",
        },
        {
            label: "02:30 pm",
            value: "02:30 pm",
        },
        {
            label: "03:00 pm",
            value: "03:00 pm",
        },
        {
            label: "03:30 pm",
            value: "03:30 pm",
        },
        {
            label: "04:00 pm",
            value: "04:00 pm",
        },
        {
            label: "04:30 pm",
            value: "04:30 pm",
        },
    ];

	/**********************************************************
					Handlers
	**********************************************************/
	useEffect(() => {
		//console.log("useEffect - docs: ",docs); 
		let doAdd = true;  
		//console.log('THESE PRETZELS ARE MAKIN ME THIRSTY', listOfDoctors)
		listOfDoctors.forEach(e=>{
			//console.log("listOfDoctors loop: e:",e._id, "docEle:",docEle,"test:",e._id == docEle._id);
			if (e._id != undefined && e._id == docEle._id){
				doAdd = false;                
			}
		});   
		if (doAdd){
			setListOfDoctors([...listOfDoctors,docEle]);
		}
		
	}, [docEle]);

	useEffect(() => {
		CreateListOfDoctors()
	}, []);

	/**********************************************************
					Axios Get
	**********************************************************/
	const CreateListOfDoctors = () => {
		setListOfDoctors([]);
		let doctorDetailsList = []
		//console.log(authUserObject.userId)
		Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/approvedDoctors/${userId}`)
			.then((response) => {
			// Sample obj {doctorUID: 23423424234, fieldOfStudy: Cardiologist}
				//console.log('YEEEEEEt', response)
				doctorDetailsList.push(response.data);
				//console.log('AYOOOOOOOOOO MANE', doctorDetailsList)
				doctorDetailsList.forEach(doctor => {
					//console.log('BOP', doctor[0])
					return Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${doctor[0].doctorUID}`)
								.then((response) => {
									//console.log('DOC INFO', response)
									doctor[0]["docName"] = (response.data[0].firstName + ' ' + response.data[0].lastName);
									setDocEle(doctor[0]);
								})
								.catch((err) => {
									console.log(err);
								})
				})
			})		
	}

	/**********************************************************
					Axios Post
	**********************************************************/
	const addAppointment = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {
                userUID:        userId,
                doctorUID:		doctorID,
                date:           date,
                time:           textTime,
				type:			typeSelect,
                locationUID:    txtLocation,
            }).then((response) => {
				setShowLocation(false);
				setTypeSelect("");
				setLocSelect("");
				setDoctorID('');
				setLocation("");
				setApptInputPopup(false);
				setTime("");
				setMyDocs("");
            }).catch((err) => {
                          
            });
    }
	/**********************************************************
					Functions
	**********************************************************/
	//used????
	const searchText = (event) => {
		setFilter(event.target.value);
	}

	const handleResize = () => {
	  if (window.innerWidth < 768) {
		  setIsMobile(true)
	  } else {
		  setIsMobile(false)
	  }
	}

	const handleClose = () => setShow(false);
	
	const onRadioLocSelect = ( event ) => {
		let inPersOrOnline = event.target.value;
		setLocSelect(inPersOrOnline);
		//console.log("Radio type Select: ", inPersOrOnline);
	}

	const getScheduleAvail = ( docID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/schedule/getScheduled/${docID}`)
            .then((response) => {                
                let data = response.data;           
                //console.log("getScheduleAvail() - response:",data);
                
            }).catch((err) => {
                console.log(err, "Unable to get Schedule");
            });
    }

	// used functions
	const onTimeSelect = ( event ) => {
        setTime(event.target.value);
    }

	const onSubmit = (event) => {
        addAppointment();
    }

	const onType = (e) => {
		if (e === 'In Person') {
		
			setShowLocation(true);
			setTypeSelect(e);
			
			//console.log(e);
			//console.log("in person loc id: " + txtLocation);
		}

		if (e === 'Virtual') {
			
			setLocation("6179e7aba30ceaeeec949c21");
			setShowLocation(false);
			setTypeSelect(e);

			//console.log(e);
			//console.log("virtual loc id: " + txtLocation);
		}
	}

	const apptClick = (doctorUID) => {

        //console.log("Appointment Click");
        //console.log("click", doctorUID);
		//getScheduleAvail(doctorUID);

        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        //console.log("Popup is ",bPop);
    }

	const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
        //console.log("Location: ",loc);
    }

	/**********************************************************
					HTML
	**********************************************************/
	return(
		<div className='appointments'>
			<Navbar/>
				<div className='Appointments-container-outer'>
				<div className='Appointments-container-inner'>
					<div className='Doctors-card' data-toggle="modal" data-target="#myModal">


						<div className="py-4 container">
							<div className={isMobile ? " " : "row justify-content-center"}>

							
							
							<div className="search-label"><h1>Find a Specialist</h1></div>
							<div className="back-button">
								<Button  href='/NoAppointments'>Go Back</Button>
							</div>
							{console.log('LIIIIIIIIIIIIIIST', listOfDoctors)}
							  {listOfDoctors.map((doctor, index) => {
								return(
				
								<div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
									
									<div className="card p-0 overflow-hidden h-100 shadow">
										<img src={img1} className="card-img-top img-fluid" />
										<div className="card-body">
											{console.log('Doc List', doctor)}
											{console.log('DOC NAME', doctor.docName)}
											{console.log('DOC STUDY', doctor.fieldOfStudy)}
											<h5 className="card-title">{doctor.docName}</h5>
											<p className="card-text">{doctor.fieldOfStudy}</p>

										
											<Button className="nextButton" onClick={() => apptClick(doctor.doctorUID)} >
												Select
											</Button>

										
									
                    
											<PopUpWindow
													trigger={apptInputPopup}
													setTrigger={setApptInputPopup}
													className="pop-up-window"

												
											>  

											
												<h5><b>Schedule Your Appointment with {}</b></h5>

												

												<h6>Click To Select Date And Time:</h6>

												 <div>
													<DatePicker                            
														selected={date}
														onChange={e=>setDate(e)}
													/>

													
												</div>

	

												<select
													style={{
														height: "25px",
														width: "100px",
														textAlign: "left"
													}}                        
													onChange={e=>onTimeSelect(e)} 
													
													onChange={(e) => {
													  const selectedTime = e.target.value;
													  setTime(selectedTime);
													}}
												>
													<option value="_placeholder_">Time</option>
													{listOfTimes.map((option) => (
														<option value={option.value}>{option.label}</option>
													))}    
												</select>

												{/* spacer */}
												<pre>     </pre>
												

												<h6>Select Your Appointment Type:</h6>
											
												
												<p 
													style={{
														position:"relative",
														top: "16px"
													}}
												> In Person Visit     
												</p>

												<input
													type="radio"
													value="inPerson"
													name="radioLocation" 
													onClick={e=>onType('In Person')}
												/>


												{showLocation == true &&
													<h6>Location:</h6>	
												}

												{showLocation == true &&
													
													 <select
														style={{
															height: "25px",
															width: "200px",
															textAlign: "left",
														}}
                            
														onChange={e=>onLocationInput(e)}  
													>
														{listOfLocations.map((option) => (
															<option value={option.value}>{option.label}</option>
														))}        
													</select>

													
												}


											
												<p 
													style={{
														position:"relative",
														top: "16px"
													}}
												> Virtual Visit</p>

												<input
													type="radio"
													value="virtual"
													name="radioLocation"
													onClick={e=>onType('Virtual')}
												/>

											

												<div>

												<Link to={`/NoAppointments`}>
													 <Button                    
														
														onClick={e=>onSubmit(e)}
														className="btnCreateAppnt"
													>
													Create
													</Button>
												</Link>

												</div>
											</PopUpWindow>
										</div>
									</div>
				
								</div>

				
								)

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

export default DoctorSearch;