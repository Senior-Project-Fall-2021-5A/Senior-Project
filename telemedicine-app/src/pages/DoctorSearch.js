import React, {useState} from 'react';
import DoctorData from './DoctorData';
import './doctors.css';
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import moment from 'moment'

import RegisterForm from '../components/RegisterForm';
import './login.css';

const DoctorSearch = ({doctorName, specialist}) => {

	const [filter, setFilter] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const [show2, setShow2] = useState(false);
	const handleClose2 = () => setShow2(false);
	const handleShow2 = () => setShow2(true);

	const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
      setDateState(e)
  }

	const searchText = (event) => {
		setFilter(event.target.value);
	}



	 const [isShowLogin2, setIsShowLogin2] = useState(true);

  const handleRegisterClick = () => {
    setIsShowLogin2((isShowLogin2) => !isShowLogin2);
  };

  const handleClick = () => {
    handleRegisterClick();
  }

	let dataSearch = DoctorData.cardData.filter(item => {
		return Object.keys(item).some(key => 
			item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
			)
	});

	return(
		<div className="py-4 container">
			<div className="row justify-content-center">

			<div className="col-12 mb-0">
				<div className="mb-3 col-4 mx-auto text-center">
					<div className="search-label"><h1>Find a Specialist</h1></div>
						<div className="container p-5">
						  <select
							className="custom-select"
							value={filter}
							onChange={(e) => {
							  const selectedFood = e.target.value;
							  setFilter(selectedFood);
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

			  {dataSearch.map((item, index) => {
				return(
						
				
				<div className="col-11 col-md-6 col-lg-2 mx-0 mb-4">
				
					<div className="card p-0 overflow-hidden h-100 shadow">
						<img src={item.img} className="card-img-top img-fluid" />
						<div className="card-body">
						<h5 className="card-title">{item.title}</h5>
						<p className="card-text">{item.desc}</p>

						<Link to='/schedulecalendar'>
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
	)
}

export default DoctorSearch;