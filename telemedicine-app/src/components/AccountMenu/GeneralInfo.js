
import {Form, Button} from 'react-bootstrap';
import './GeneralInfo.css'
import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import authUserObject from '../../middleware/authUserObject';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



function GeneralInfo() {
    
    const [generalInfo, setgeneralInfo] = useState([]);
    const [txtError, setError] = React.useState("");
    const [boolError, setBoolError] = React.useState(false);
    const [userPhone, setPhone1] = React.useState("");
    const [userAddress1, setAddress1] = React.useState("");
    const [userAddress2, setAddress2] = React.useState("");
    const [userCity, setCity] = React.useState("");
    const [userState, setState] = React.useState("");
    const [userZip, setZip] = React.useState("");
    const [userDoB, setDoB] = React.useState("");
    const [userGender, setUserGender] = React.useState("");
    const [registerUserState, setRegisterUserState] = useState({
        phone1: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        DoB: '',
        gender: ''
      })
      
    
    const handleChange = e => {
        setRegisterUserState({
          ...registerUserState,
          [e.target.name]: e.target.value,
        })
      }

    //   const onGenderSelect = ( event ) => {
    //     //console.log("onDoctorSelect - ",event);
    //     let myGender = event.target.value;
    //     //console.log("Value set: ", docID);
    //     setGender(myGender);
    // }

      const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {

          await handleUserRegisterClick();
          alert('Your registration was successfully submitted!');
          this.registerUserState.userAddress1({
            
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            DoB: '',
            gender: '' 
            });
        } catch (e) {
          alert('Your registration was successfully submitted!');
        }
      }
  

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${authUserObject.userId}`)
            .then((response) => {
                const myInfo = response.data;
                setgeneralInfo(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get uder infor");
            });
    }, [generalInfo]);

    const onPhoneSelect = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setPhone1(event.target.value);
    }

    const onAddress1change = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setAddress1(event.target.value);
    }
    const onAddress2change = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setAddress2(event.target.value);
    }
    const onCitychange = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setCity(event.target.value);
    }
    const onStatechange = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setState(event.target.value);
    }
    const onZipchange = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setZip(event.target.value);
    }
    const onDoBchange = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setDoB(event.target.value);
    }
    const onGenderSelect = ( event ) => {
        //console.log("onPatientSelect - ",event);
        //console.log("Value set: ", event.target.value);
        setUserGender(event.target.value);
    }
            const handleUserRegisterClick = () => {
                /* console.log("Final Add Apt -  textPatientID: ",textPatientID," textDoctorID: ",textDoctorID, " txtDate: ",txtDate,
                    " textTime: ",textTime, " txtLocSelect: ",txtLocSelect," txtLocation: ",txtLocation); */
                Axios.post(`https://telemedicine5a-backend.herokuapp.com/users/updateUserInfo/${authUserObject.userId}`, {
                        phone1: userPhone,
                        address1: userAddress1,
                        address2: userAddress2,
                        city: userCity,
                        state: userState,
                        zip:    userZip,
                        DoB:    userDoB,
                        gender:    userGender,
                    }).then((response) => {
                        //console.log("Add Appt, addAppointment(), response: ",response) 
                        
                        //cleanup
                        setBoolError(false);
                        setPhone1("");
                        setAddress1(""); 
                        setAddress2("");
                        setState("")
                        setCity("");                
                        setDoB("");
                        setZip("");
                        setUserGender("");
                    }).catch((err) => {
                        //get Error
                        console.log("Org Error: ",err);
        
                        //error display
                        setError("Unable to add Appointment");
                        setBoolError(true);            
                    });
            }

    

    return (
        <Form className='general-info-form' onSubmit={onSubmit}>
            {generalInfo.map((info) => (
            <><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px" }}>{info.firstName} </p> <p style={{paddingRight:"10px"}}>{info.midName}</p> <p>{info.lastName}</p> <h4 className='UserID'>User ID: {info.userUID}</h4>
                    </Form.Text>
                    <Form.Text className="text-muted" style={{ fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px" }}>Date of Birth: {info.DoB} </p> 
                    </Form.Text>
                    <Form.Text className="text-muted" style={{ display:"flex",fontSize: '25px' }}>
                        <p style={{ paddingRight: "10px"}}>Gender: {info.gender} </p> 
                    </Form.Text>
                    <Form.Text className="text-muted" style={{ fontWeight:'bold' }}>
                        (all fields required for entry below)
                    </Form.Text>
                </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Text style={{paddingRight:"10px", fontSize: '25px' }}>Current e-mail address: {info.email}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black' }}>Date of Birth</Form.Label>
                        <input type="date" value={userDoB}  onChange={(date) => onDoBchange(date)}/>
                        {/* <DatePicker selected={startDate} dateFormat="MMMM d, yyyy" onChange={(date) => setDoB(date)} /> */}
                        {/* <Form.Control name ="DoB"  value={registerUserState.userDoB} onChange={e=> onDoBchange(e)} type="text"  placeholder="Change Your Date of Birth" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black' }}>Gender Settings</Form.Label>
                        <select
                        style={{
                            height: "40px",
                            width: "580px",
                            textAlign: "left",
                        }}
                        onChange={e => onGenderSelect(e)}
                        
                    >
                        <option key="puaa_doctor_placeholder" value={userGender}>Select a Gender</option>
                        
                            <option key={registerUserState.userGender} type="text" name ="gender"  value={registerUserState.userGender}>Male</option>
                            <option key={registerUserState.userGender} name ="gender" value={registerUserState.userGender}>Female</option>
                            <option  key={registerUserState.userGender} name ="gender"  value={registerUserState.userGender}>Other</option>
                            
                    </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'black' }}>Current Phone Number: {info.phone1}</Form.Label>
                        <Form.Control name ="phone1"  value={userPhone} onChange={e=> onPhoneSelect(e)} type="text"  placeholder="Change Phone Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress" >
                        <Form.Label style={{ color: 'black' }}>Current address: {info.address1} {info.address2} {info.city} , {info.state} {info.zip}</Form.Label>
                        <Form.Control name="address1" value={userAddress1}  onChange={e=> onAddress1change(e)} type="text" required placeholder="Address 1" />
                        <Form.Control name="address2" value={userAddress2} onChange={e=> onAddress2change(e)} type="text"  placeholder="Address 2" />
                        <Form.Control name="city" value={userCity}   onChange={e=> onCitychange(e)} type="text" required  placeholder="City" />
                        <Form.Control name="state" value={userState}  onChange={e=> onStatechange(e)} type="text" required placeholder="State" />
                        <Form.Control name="zip" value={userZip}  onChange={e=> onZipchange(e)} type="text" required placeholder="Zip" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Save
                    </Button></>

                    
            ))}
            {/* Button Error Message */}
            {
                boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                >{txtError}</p>
            }
        </Form>
    
    )
}

export default GeneralInfo