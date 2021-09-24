import './appointments.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

import {Link} from "react-router-dom";

function confirmSchedule() {



   return (
       <div className='appointments'>
            <Navbar/>
            <div className='Appointments-container-outer'>
            <div className='Appointments-container-inner'>

                <Link to='/appointments'>
                <button class="confirm-btn">Continue</button>
                </Link>
            </div>
            </div>
            <Footer/>
       </div>
   )
}

export default confirmSchedule;