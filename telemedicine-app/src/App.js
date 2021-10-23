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

import confirmSchedule from './pages/confirmSchedule';
import Inbox from './pages/inbox/inbox';
import ComposeMessage from './pages/inbox/ComposeMessage';


import Reports from './pages/reports_page/reports'; 
import ReportDisplay from './pages/reports_page/reportDisplay';

import adminPortal from './pages/admin_portal/AdminPage';

import AppointmentType from './pages/AppointmentType';


import NoAppointments from './pages/NoAppointments';

import MyAccount from './pages/MyAccount';



import { Fragment } from 'react';
import Registration from './pages/Registration';
import Loading from './pages/loading';


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
          
          <Route path='/loading' exact component={Loading}/>
          <Route path='/doctorsearch' component={DoctorSearch}/>

          <Route path="/schedulecalendar/:doc/:type">
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

          <Route path='/schedulecalendar' component={ScheduleCalendar}/>
          <Route path='/confirmSchedule' component={confirmSchedule}/>
          <Route path="/" exact component={Login} /> 
          <Route path='/myaccount' component={MyAccount} />

          <Route path='/reports' component={Reports}/>
          <Route path='/reportDisplay' component={ReportDisplay}/>
          <Route path="/" exact component={Login} />   

          <Route path='/inbox' component={Inbox} />  
          <Route path='/ComposeMessage' component={ComposeMessage} />

          <Route path='/adminPortal' component={adminPortal}/>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
