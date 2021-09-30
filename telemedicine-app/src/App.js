import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/login";
import About from "./pages/about";
import Homepage from './pages/homepage';

import Appointments from './pages/appointments';

import DoctorSearch from './pages/DoctorSearch';
import ScheduleCalendar from './pages/ScheduleCalendar';
import ConfirmSchedule from './pages/ConfirmSchedule';

import Reports from './pages/reports';
import ReportDisplay from './pages/reportDisplay';

import AppointmentType from './pages/AppointmentType';

import NoAppointments from './pages/NoAppointments';


import { Fragment } from 'react';


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
          <Route path="/schedulecalendar/:doc/:type">
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

        </Switch>
      </div>
    </Router>
  );
}

export default App;
