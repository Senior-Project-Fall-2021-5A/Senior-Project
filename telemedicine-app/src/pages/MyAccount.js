import React from 'react'
import Accountnav from '../components/AccountMenu/AccountNav'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './MyAccount.css'


function MyAccount() {
    return (
        <div className='myaccount-page'>
            <Navbar/>
            <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>
                            <div className='Dashboard-row'>
                                <div className='account-panel'>
                                    <Accountnav/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MyAccount

