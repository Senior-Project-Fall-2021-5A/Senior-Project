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

const DoctorSearch = () => {

	const [filter, setFilter] = useState('');

	const [show, setShow] = useState(false);
	
	const handleShow = () => setShow(true);

	const [isMobile, setIsMobile] = useState(false)

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

	useEffect(() => {
	  window.addEventListener("resize", handleResize)
	})

	let dataSearch = DoctorData.cardData.filter(item => {
		return Object.keys(item).some(key => 
			item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
			)
	});

	return(


		<div className='appointments'>
			<Navbar/>
				<div className='Appointments-container-outer'>
				<div className='Appointments-container-inner'>
					<div className='Doctors-card' data-toggle="modal" data-target="#myModal">


						<div className="py-4 container">
							<div className={isMobile ? " " : "row justify-content-center"}>

							<div className="col-12 mb-0">
								<div className="mb-3 col-4 mx-auto text-center">
									<div className="search-label"><h1>Find a Specialist</h1></div>
										<div className="container p-5">
										  <select
											className="custom-select"
											value={filter}
											onChange={(e) => {
											  const selectedDoc = e.target.value;
											  setFilter(selectedDoc);
											}}
										  >
											<option value="specialist">Specialist</option>
											<option value="allergist">Allergist</option>
											<option value="anesthesiologist">Anesthesiologist</option>
											<option value="cardiologist">Cardiologist</option>
											<option value="dermatologist">Dermatologist</option>
											<option value="Family Physician">Family Physician</option>
											<option value="Infectious Disease">Infectious Disease</option>
											<option value="neurologist">Neurologist</option>
											<option value="oncologist">Oncologist</option>
											<option value="pathologist">Pathologist</option>
											<option value="pediatrician">Pediatrician</option>
											<option value="physiatrist">Physiatrist</option>
											<option value="radiologist">Radiologist</option>
											<option value="General Surgeon">General Surgeon</option>

							
										  </select>
						
										</div>

									</div>

								</div>

								<div>
				
								</div>

							  {dataSearch.map((item, index) => {
								return(
						
				
								<div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
				
									<div className="card p-0 overflow-hidden h-100 shadow">
										<img src={item.img} className="card-img-top img-fluid" />
										<div className="card-body">
										<h5 className="card-title">{item.title}</h5>
										<p className="card-text">{item.desc}</p>

										<Link to={`/AppointmentType/${item.title}`}>
										<Button className="nextButton" onClick={handleShow}>
											Select
										</Button>
										</Link>

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