import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./pages/login";
import About from "./pages/about";
import Homepage from './pages/homepage';
import { Fragment } from 'react';




function App() {

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/about" component={About} />
          <Route path='/homepage' component={Homepage}/>
          <Route path="/" exact component={Login} />          
        </Switch>

      </div>
    </Router>
  );
}

export default App;
