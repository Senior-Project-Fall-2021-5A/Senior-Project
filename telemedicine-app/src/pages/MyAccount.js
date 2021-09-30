import React from 'react'
import Accountnav from '../components/AccountMenu/AccountNav'
import Navbar from '../components/Navbar/Navbar'
import './MyAccount.css'


function MyAccount() {
    return (
        <div className='myaccount-page'>
            <Navbar/>
            <div className='canvas-outer'>
                    <div className='canvas-inner'>
                        <div className='page-canvas'>
                            <div className='Dashboard-row'>
                                <div className='account-panel'>
                                    <Accountnav/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default MyAccount

