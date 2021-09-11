import React from 'react';
import Canvas from '../components/Canvas';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

function Homepage() {
    return (
        <div className='homepage'>
            <Navbar/>
            <Canvas/>
            <Footer/>
        </div>
    )
}

export default Homepage;
