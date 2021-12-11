import './InsuranceInfo.css'
import React, {useState,useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import  Axios  from 'axios';
import authUserObject from '../../middleware/authUserObject';



function InsuranceInfo() {
    const [insuranceInfo, setinsuranceInfo] = useState([]);
    const [userInsurance1, setuserInsurance1] = React.useState("");
    const [userInsurance2, setuserInsurance2] = React.useState("");
    const [userInsurance3, setuserInsurance3] = React.useState("");
    const [boolError, setBoolError] = React.useState(false);
    const [txtError, setError] = React.useState("");
    const [registerUserState, setRegisterUserState] = useState({
        Insurance01UID: '',
        Insurance02UID: '',
        Insurance03UID: '',
      })

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${authUserObject.userId}`)
            .then((response) => {
                console.log("insurance info:",response);
                const myInsurance = response.data;
                setinsuranceInfo(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get user information");
            });
    }, [insuranceInfo]);

    const onInsurance1change = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setuserInsurance1(event.target.value);
    }
    const onInsurance2change = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setuserInsurance2(event.target.value);
    }
    const onInsurance3change = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setuserInsurance3(event.target.value);
    }


    const handleUserRegisterClick = () => {
        /* console.log("Final Add Apt -  textPatientID: ",textPatientID," textDoctorID: ",textDoctorID, " txtDate: ",txtDate,
            " textTime: ",textTime, " txtLocSelect: ",txtLocSelect," txtLocation: ",txtLocation); */
        Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/updateUserInfo/${authUserObject.userId}`, {
                Insurance01UID: userInsurance1,
                Insurance02UID: userInsurance2,
                Insurance03UID: userInsurance3
            }).then((response) => {
                //console.log("Add Appt, addAppointment(), response: ",response) 
                
                //cleanup
                setBoolError(false);
                setuserInsurance1("");
                setuserInsurance2(""); 
                setuserInsurance3("");
            }).catch((err) => {
                //get Error
                console.log("Org Error: ",err);

                //error display
                setError("Unable to add Appointment");
                setBoolError(true);            
            });
    }

    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {

          await handleUserRegisterClick();
          alert('Your registration was successfully submitted!');
          setRegisterUserState({
            Insurance01UID: '',
            Insurance02UID: '',
            Insurance03UID: '',
            });
        } catch (e) {
          alert('Your registration was successfully submitted!');
        }
      }
    return (
        
        <Form className='insurance-info-form' onSubmit={onSubmit}>
            {insuranceInfo.map((insurance) => (
            <><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px" }}>{insurance.firstName} </p> <p>{insurance.lastName}</p> <h4 className='UserID'>Insurance Policy: {insurance.Insurance01UID}</h4>
                    </Form.Text>
                </Form.Group><Form.Group className="mb-3 insurance-provider" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'black', fontSize: '25px', marginTop: '15%' }}>Insurance Provider: {insurance.Insurance02UID} </Form.Label>
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black', fontSize: "25px" }}>Insuracne Account #: {insurance.Insurance03UID} </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label style={{ color: 'black' }}>Please enter your current or new insurance information below (all fields required) </Form.Label>
                        <Form.Control name="Insurance01UID" value={userInsurance1} onChange={e => onInsurance1change(e)} type="text" required placeholder="Insurance Policy" />
                        <Form.Control name="Insurance02UID" value={userInsurance2} onChange={e => onInsurance2change(e)} type="text" placeholder="Insurance Provider" />
                        <Form.Control name="Insurance03UID" value={userInsurance3} onChange={e => onInsurance3change(e)} type="text" required placeholder="Insurance Account #" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button></>
        ))}
        </Form>
        
    
    )
}

export default InsuranceInfo