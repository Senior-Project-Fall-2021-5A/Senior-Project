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

import Inbox from './pages/inbox';


import Reports from './pages/reports';
import ReportDisplay from './pages/reportDisplay';

import AppointmentType from './pages/appointments/AppointmentType';


import NoAppointments from './pages/appointments/NoAppointments';

import { Fragment } from 'react';
import MyAccount from './pages/MyAccount';


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
          
         
          <Route path='/doctorsearch' component={DoctorSearch}/>

          <Route path="/ScheduleCalendar/:doc/:type">
          <ScheduleCalendar/>
          </Route>
          <Route path="/ConfirmSchedule/:doc/:type/:date/:time">
          <ConfirmSchedule/>
          </Route>
          <Route path="/" exact component={Login} />        

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


        </Switch>
      </div>
    </Router>
  );
}

export default App;
