import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import authUserObject from './middleware/authUserObject';
import Axios from 'axios';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/sign_on/login";
import About from "./pages/about";
import Homepage from './pages/homepage';
import Appointments from './pages/appointments/appointments';
import DoctorSearch from './pages/doctors/DoctorSearch';
import ScheduleCalendar from './pages/doctors/ScheduleCalendar';
import ConfirmSchedule from './pages/appointments/ConfirmSchedule.js';
import Inbox from './pages/inbox/inbox';
import ComposeMessage from './pages/inbox/ComposeMessage';
import Reports from './pages/reports_page/reports'; 
import ReportDisplay from './pages/reports_page/reportDisplay';
import adminPortal from './pages/admin_portal/AdminPage';
import AppointmentType from './pages/appointments/AppointmentType';
import NoAppointments from './pages/appointments/NoAppointments';
import MyAccount from './pages/MyAccount';
import Registration from './pages/sign_on/Registration';
import LoginLoading from './pages/sign_on/loginloading';
import Chevron from './components/inbox components/Chevron.js'
//import CreateRoom from "./components/routes/CreateRoom";
import Room from "./components/routes/Room";
import NotesPopUp from './pages/doctors/NotesPopUp.js';


function App() {
  //declarations
  const [txtGlobalUserID, setGlobalUserID] = useState(authUserObject.userId);
  const [txtGlobalRole, setGlobalRole] = useState(authUserObject.userRole);
  const [boolIsLogged, setIsLogged] = useState(authUserObject.boolIsLogged);

  useEffect(() => {
      //console.log("AppJS - UID: ",txtGlobalUserID," role: ",txtGlobalRole);
      Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${txtGlobalUserID}`)////${txtGlobalUserID}
          .then((response) => {
              //console.log("AppJS - responce: ",response);
              let data = response.data[0];
              localStorage.setItem('firstName', data.firstName);
              localStorage.setItem('midName', data.midName);
              localStorage.setItem('lastName', data.lastName);
              localStorage.setItem('email', data.email);
              localStorage.setItem('primaryPhysician', data.primaryPhysician);
              localStorage.setItem('approvedDoctors', JSON.stringify(data.approvedDoctors));
              localStorage.setItem('isAdmin', data.isAdmin.toString());  
              //setIsLogged(true);
          })
          .catch((err) => {
              console.log(err, "Unable to get Reports");
          });
  }, []);
  
  return (
      <Router>
        <div className="App">
          <Switch>
            {authUserObject.boolIsLogged == "true" ? 
              <div>
                <Route path="/about" component={About} />
                <Route path="/AppointmentType/:name">
                <AppointmentType/>
                </Route>
                <Route path='/homepage' component={Homepage}/>
                <Route path="/" exact component={Homepage} />
                <Route path='/appointments' exact component={Appointments}/>
                <Route path='/NoAppointments' exact component={NoAppointments}/>
                <Route path='/loginloading' exact component={LoginLoading}/>
                <Route path='/doctorsearch' component={DoctorSearch}/>
                <Route path="/ScheduleCalendar/:doc/:type">
                <ScheduleCalendar/>
                </Route>
                <Route path="/registration" component={Registration} />           
                <Route path="/room/:roomID" component={Room} />       
                <Route path="/appointments/:doc/:type/:date/:time">
                <Appointments/>
                </Route>
                <Route path="/ConfirmSchedule/:doc/:type/:date/:time" component={ConfirmSchedule}/>
                <Route path='/myaccount' component={MyAccount} />
                <Route path='/reports' component={Reports}/>
                <Route path='/reportDisplay' component={ReportDisplay}/>
                
                <Route path='/inbox' component={Inbox} />   
                <Route path='/ComposeMessage' component={ComposeMessage} />
                <Route path='/adminPortal' component={adminPortal}/>
                <Route path='/chevron' component={Chevron} />

                <Route path='/NotesPopUp' component={NotesPopUp} />
              </div>              
            :
              <div>
                <Route path="/" component={Login} />  
                
              </div>              
            }
            
          </Switch>
        </div>
      </Router>
  );
}

export default App;
