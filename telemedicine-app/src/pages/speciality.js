import React, { useState }  from 'react';
import './speciality.css';
import { Button } from 'react-bootstrap';
import Doctors from '../pages/doctors';

const Speciality = ({ isShowSchedule }) => {

  const [isShowDoctors, setIsShowDoctors] = useState(true);

  const handleRegisterClick = () => {
    setIsShowDoctors((isShowDoctors) => !isShowDoctors);
    
  };

  const handleClick = () => {
    handleRegisterClick();
  }

  return (
    <div className={`${isShowSchedule ? "active" : ""} show`}>
      <div className="speciality-form">
        
      </div>

      <div className="allergist" onClick={handleClick}>
          <Button className="allergist-text">
            Allergist
          </Button>
      </div>
     
      <Doctors isShowDoctors={isShowDoctors} />
     


      <div className="cardiologist">
          <Button className="cardiologist-text">
            Cardiologist
          </Button>
      </div>
        
    </div>
  );
};

export default Speciality;