import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/login";
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

import Client from './pages/VideoChat/Client';


import { Fragment } from 'react';
import Registration from './pages/Registration';
import LoginLoading from './pages/loginloading';



function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/AppointmentType/:name">
          <AppointmentType/>
          </Route>
          <Route path='/homepage' component={Homepage}/>

          <Route path='/appointments' exact component={Appointments}/>
          <Route path='/NoAppointments' exact component={NoAppointments}/>
          
          <Route path='/loginloading' exact component={LoginLoading}/>
          
          <Route path='/doctorsearch' component={DoctorSearch}/>

          <Route path="/ScheduleCalendar/:doc/:type">
          <ScheduleCalendar/>
          </Route>
          <Route path="/ConfirmSchedule/:doc/:type/:date/:time">
          <confirmSchedule/>
          </Route>
          <Route path="/" exact component={Login} /> 
          <Route path="/registration" component={Registration} />           

          <Route path='/reports' component={Reports}/>
          <Route path='/reportDisplay' component={ReportDisplay}/>
          <Route path="/" exact component={Login} />      
          
          <Route path="/appointments/:doc/:type/:date/:time">
          <Appointments/>
          </Route>

         
          <Route path='/ConfirmSchedule' component={ConfirmSchedule}/>
          <Route path="/" exact component={Login} /> 
          <Route path='/myaccount' component={MyAccount} />

          <Route path='/reports' component={Reports}/>
          <Route path='/reportDisplay' component={ReportDisplay}/>
          <Route path="/" exact component={Login} />   

          <Route path='/inbox' component={Inbox} />   
          
          <Route path='/client' component={Client} />
          <Route path='/inbox' component={Inbox} />  
          <Route path='/ComposeMessage' component={ComposeMessage} />

          <Route path='/adminPortal' component={adminPortal}/>
          <Route path='/inbox' component={Inbox} />   
          
          <Route path='/client' component={Client} />


        </Switch>
      </div>
    </Router>
  );
}

export default App;
