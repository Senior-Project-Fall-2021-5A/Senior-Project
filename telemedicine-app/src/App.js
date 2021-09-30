import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/login";
import About from "./pages/about";
import Homepage from './pages/homepage';

import Appointments from './pages/appointments';
import Doctors from './pages/doctors';
import DoctorSearch from './pages/DoctorSearch';
import ScheduleCalendar from './pages/ScheduleCalendar';
import confirmSchedule from './pages/confirmSchedule';
import Inbox from './pages/inbox';

import Reports from './pages/reports';
import ReportDisplay from './pages/reportDisplay';


import { Fragment } from 'react';
import MyAccount from './pages/MyAccount';




function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about" component={About} />
          <Route path='/homepage' component={Homepage}/>

          <Route path='/appointments' component={Appointments}/>
          <Route path='/doctors' component={Doctors}/>
          <Route path='/doctorsearch' component={DoctorSearch}/>
          <Route path='/schedulecalendar' component={ScheduleCalendar}/>
          <Route path='/confirmSchedule' component={confirmSchedule}/>
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
