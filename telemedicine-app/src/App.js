import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button'
import Header from './components/header';
import { Router, Route, Switch } from "react-router";
import {Link} from 'react-router-dom'



function App() {
  return (
    <div className="App">
    <Button variant="primary">
      <Link to='./pages/homepage.js'>
        Hello
      </Link>
    </Button>{''}
      
    
    

    </div>
  );
}

export default App;
