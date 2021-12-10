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
import moment from 'moment' 


import './doctors.css';

import Axios from 'axios';

import img1 from './avatar_placeholder.png';

import { Modal } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ObjButton from '../../components/Objects/ObjButton'

import PopUpWindow from '../../components/Objects/ObjPopUpWindow'

import ObjLink from '../../components/Objects/ObjLink'

import authUserObject from '../../middleware/authUserObject';


const DoctorSearch = ( {trigger,setTrigger} ) => {

	
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const [isMobile, setIsMobile] = useState(false);

	const [textTime,setTime] = React.useState("");
	const [typeSelect,setTypeSelect] = React.useState("");
	const [showLocation, setShowLocation] = useState(false);
	const [txtLocation,setLocation] = React.useState("");
	const [listOfLocations,setListOfLocations] = React.useState([]);
	const [dateValue, setDateValue] = React.useState(new Date());
    const [txtDateValue, setTxtDateValue] = React.useState(new Date().toLocaleDateString("en-US").split('/').join('-'));
	const [date,setDate] = React.useState(new Date());

	const [apptInputPopup, setApptInputPopup] = React.useState(false);  

	

	


	const [myDocs, setMyDocs] = useState([]);
	const [approved, setApproved] = useState([]);
	const [finalList, setFinalList] = useState([]);
	const [doctorID, setDoctorID] = useState('');

	const [txtLocSelect,setLocSelect] = React.useState("");

	

	const handleResize = () => {
		if (window.innerWidth < 768) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	var userId = String(authUserObject.userId)

	useEffect(() => {
	 
	    window.addEventListener("resize", handleResize)
	  
		CreateListOfPatientDocFamily(userId);
	 
        //CreateListOfDoctors();

		
		

		//setMyDocs([]);
		
		getDocFields();


		//CreateDocListOfAprrovedFamily();
		//newCreateListOfDoctors();
		//getDocNames();
	    

		

	}, [])


	/*****************************************************************************

		Axios requests function to get information of doctor and the user patient,
		and creating a new list of doctors for the patient based on the approved 
		families (field of studies) of the patient

	******************************************************************************/

	const CreateListOfPatientDocFamily = ( userID ) => {
			console.log("CreateListOfPatientDocFamily() - userID: ",userID);
			Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${userID}`)        
				.then((response) => {                
					let data = response.data[0].approvedDoctors;  
					
					setApproved(data);

					/*
					console.log("CreateListOfPatientDocFamily - response:",data);
					data.forEach(e=>{setlistOfApprovedDocFamily(listOfApprovedDocFamily=> [...listOfApprovedDocFamily, {
						label:  e,
						value:  e,
						}]
					)});  
					*/
				}).catch((err) => {
					console.log(err, "Unable to get Patients list of Doctors");
				});

				//CreateListOfDoctors();


				//console.log("lit fam: " + listOfApprovedDocFamily);
		}

	/*
	const CreateListOfDoctors = (  ) => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
            .then((response) => {                
                let data = response.data;           
                console.log("list of ALL docs (24 ish) response:",data);
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.firstName + " " + e.lastName,
                    value: e.userUID,
					
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }
	*/
	


	const getDocFields = (  ) => {
		
        let newList = [];
        
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorInfo/`)
            .then((response) => {
                let data = response.data;
                //console.log("getID() - response:", data[0].doctorUID);

				console.log("The doctors with f.o.s. (only five) - ", data);

				data.forEach(e => {

					//console.log("getID() - responseyyyy:", e.doctorUID);

					let docId = e.doctorUID;
					let studyField = e.fieldOfStudy;

					Axios.get(`http://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${docId}`)
						.then((response) => {

							let userDoc = response.data;

							//console.log('userDoc: ' + userDoc[0]);

							userDoc.forEach(e=>{setMyDocs(myDocs => [...myDocs, {

								label: e.firstName + " " + e.lastName,
								fos: studyField,
								value: docId,
					
							}]
						)});

							
						}).catch((err) => {
							console.log(err, "Unable to get doctor");
						});

				})

				
				let dataSearch = [];
			
				for(let key in myDocs) {

					if(approved.includes(myDocs[key].fos)) {
						console.log("Get field of study   " + myDocs[key].fos);
						finalList.push(myDocs[key]);
					}
			
				}
				console.log("Nick's approved list  ", approved);
				

				//var newArray = JSON.parse(JSON.stringify(dataSearch));
				//setFinalList(newArray);

				//console.log("Final List of approved docs     ", finalList);


				 Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/approvedDoctors/${userId}`)
				.then((response) => {                
					let data = response.data;
					console.log("........", data)
					//console.log("getScheduleAvail() - response:",data);
                
				}).catch((err) => {
					//console.log(err, "Unable to get Schedule");
				});


				//let fos = data.fieldOfStudy;
				//console.log("myDocs bro - response:", myDocs.fos);

					

					
                //let name = data[0].lastName + ", " + data[0].firstName;
                //console.log("setTheNames() - name:", name);

                //e.doctorName = name;
                //console.log("setTheNames() - e.doctorName:", e.doctorName);

                //console.log("setTheNames() - arrData: ", arrData);
                //newList = [...newList, e];

				//setMyDocs(newList);
				//console.log("myDocs - " + newList);
                    
            }).catch((err) => {
                console.log(err, "Unable to get doctor");
            });

				
	}

	function CreateDocListOfAprrovedFamily() {

		
		/*
		let dataSearch = [];
			
		for(let key in myDocs) {

			if(approved.includes(myDocs[key].fos)) {
				console.log("key you   " + myDocs[key].fos);
				dataSearch.push(myDocs[key]);
			}
			
		}
		console.log("myDocs  ", approved);
		setFinalList(dataSearch);
		console.log("Final List of approved docs     ", finalList);
		*/

		
			
	}



	const getLocations = ( e ) => {
		let drId = e;
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorLocation/${drId}`)
            .then((response) => {                
                let data = response.data; 
				let lctn = data[0].locationUID;

				console.log("tytytytytytyty;   ", lctn); 
                
				Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocation/${lctn}`)
					.then((response) => {    
						let data2 = response.data;
						let addr = data2[0].name;
						console.log("loc name is here:   ", addr);        
                
						//setListOfLocations(addr);
						data2.forEach(e=>{setListOfLocations(listOfLocations=>[...listOfLocations,{
								label: e.name,
								value: e._id,
							}]
						)})

					}).catch((err) => {
						console.log(err, "Unable to get Locations");
					});

            }).catch((err) => {
                //console.log(err, "Unable to get Locations");
            });
    }

	const getScheduleAvail = ( docID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/schedule/getScheduled/${docID}`)
            .then((response) => {                
                let data = response.data;           
                console.log("getScheduleAvail() - response:",data);
                
            }).catch((err) => {
                console.log(err, "Unable to get Schedule");
            });
    }


	/*********************************************************************************

			Axios post

	*********************************************************************************/

	const addAppointment = () => {

        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {

                userUID:        userId,
                doctorUID:		doctorID,
                date:           txtDateValue,
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
				setDateValue("");
				setTxtDateValue("");
				//setYeahMan("");
				//setApproved("");

            }).catch((err) => {
                          
            });
    }

	/****************************************************

			Select a Doctor Button

	****************************************************/

	const apptClick = (e) => {

		let docID = e;

        console.log("Appointment Click");
        console.log("click", e);

		setDoctorID(e);
		getLocations(e);
		getScheduleAvail(docID);

        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        console.log("Popup is ",bPop);

    }


	/***********************************************************************

		Functions of the form to schedule an appointment with selected doctor

	************************************************************************/

	

	 const onRadioLocSelect = ( event ) => {
        let inPersOrOnline = event.target.value;
		setLocSelect(inPersOrOnline);

       
        console.log("Radio type Select: ", inPersOrOnline);
       
    }

	const onTimeSelect = ( event ) => {
        
        setTime(event.target.value);
    }

	const listOfTimes =[
        {
            label: "09:00AM",
            value: "09:00AM",
        },   
        {
            label: "09:30AM",
            value: "09:30AM",
        },     
        {
            label: "10:00AM",
            value: "10:00AM",
        },
        {
            label: "10:30AM",
            value: "10:30AM",
        },
        {
            label: "11:00AM",
            value: "11:00AM",
        },
        {
            label: "11:30AM",
            value: "11:30AM",
        },
        {
            label: "12:00PM",
            value: "12:00PM",
        },
        {
            label: "12:30PM",
            value: "12:30PM",
        },
        {
            label: "01:00PM",
            value: "01:00PM",
        },
        {
            label: "01:30PM",
            value: "01:30PM",
        },
        {
            label: "02:00PM",
            value: "02:00PM",
        },
        {
            label: "02:30PM",
            value: "02:30PM",
        },
        {
            label: "03:00PM",
            value: "03:00PM",
        },
        {
            label: "03:30PM",
            value: "03:30PM",
        },
        {
            label: "04:00PM",
            value: "04:00PM",
        },
        {
            label: "04:30PM",
            value: "04:30PM",
        },
    ];


	

	 /*const onDoctorSelect = ( event ) => {
        
        let docID = event.target.value;
      
        setDoctorID(docID);
		getScheduleAvail(docID);
		CreateListOfPatientDocFamily(userId);
        
    }*/


	const onType = (e) => {

		if (e === 'In Person') {
		
			setShowLocation(true);
			setTypeSelect(e);
			
			console.log(e);
			console.log("in person loc id: " + txtLocation);
			
		}

		if (e === 'Virtual') {
			
			setLocation("6179e7aba30ceaeeec949c21");
			setShowLocation(false);
			setTypeSelect(e);

			console.log(e);
			console.log("virtual loc id: " + txtLocation);	
			
		}
		
	}

	 

	

	const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
       // console.log("Location: ",loc);
        
    }

	

	/* List of approved doctors for the user */


	

    const dateSelected = ( event ) => {

		setDate(event);
        setDateValue(event);

        //convert date to string
        setTxtDateValue(event.toLocaleDateString("en-US").split('/').join('-'));

		console.log("local string date: " + dateValue);
		//console.log("text date value: " + txtDateValue);
    }


	/**********************************************************************

		When 'Create' appointment button is clicked and triggers axios post

	***********************************************************************/

	const onSubmit = (event) => {
		addAppointment();
    }

	
	/*****************
		Return 
	*****************/

	return(


		<div className='appointments'>
			<Navbar/>
				<div className='Appointments-container-outer'>
				<div className='Appointments-container-inner'>
					<div className='Doctors-card' data-toggle="modal" data-target="#myModal">


						<div className="py-4 container">
							<div className={isMobile ? " " : "row justify-content-center"}>

							
								
							<div className="search-label"><h1>Find a Specialist</h1></div>
												

							  {finalList.map((item, index) => {
								return(
						
				
								<div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
				
									<div className="card p-0 overflow-hidden h-100 shadow">
										<img src={img1} className="card-img-top img-fluid" />
										<div className="card-body">
											<h5 className="card-title">{item.label}</h5>
											<p className="card-text">{item.fos}</p>

										
											<Button className="nextButton" onClick={e => apptClick(item.value)}>
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
														onChange={e=>dateSelected(e)}
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