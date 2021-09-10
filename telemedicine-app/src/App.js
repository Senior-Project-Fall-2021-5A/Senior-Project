import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button'
import Header from './components/header';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import HomePage from "./pages/homepage";
import About from "./pages/about";
// import { Button } from 'bootstrap';
// import { Router, Route, Switch } from "react-router";
// import {Link} from 'react-router-dom'



function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Link to="/about">
        <Button variant="primary">
          About
        </Button>{' '}
        </Link>
        <Switch>
          <Route path="/about" component={About} /> 
          <Route path="/" component={HomePage} />
          
        </Switch>
        

      
        
      
      

      </div>
    </Router>
  );
}

export default App;
