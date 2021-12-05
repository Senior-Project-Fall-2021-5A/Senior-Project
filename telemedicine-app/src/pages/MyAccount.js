import React from 'react';
import Accountnav from '../components/AccountMenu/AccountNav';
import Canvas from '../components/Canvas';
import './MyAccount.css';


function MyAccount() {
    return (
        <div className='myaccount-page'>
            <Canvas>
                <div className='Dashboard-row'>
                    <div className='account-panel'>
                        <Accountnav/>
                    </div>
                </div>
            </Canvas>     
        </div>
    )
}

export default MyAccount

