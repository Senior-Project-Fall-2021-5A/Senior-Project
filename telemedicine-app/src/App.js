import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/login";
import About from "./pages/about";
import Homepage from './pages/homepage';
import Reports from './pages/reports';
import ReportDisplay from './pages/reportDisplay';

import { Fragment } from 'react';




function App() {

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/about" component={About} />
          <Route path='/homepage' component={Homepage}/>
          <Route path='/reports' component={Reports}/>
          <Route path='/reportDisplay' component={ReportDisplay}/>
          <Route path="/" exact component={Login} />          
        </Switch>

      </div>
    </Router>
  );
}

export default App;
