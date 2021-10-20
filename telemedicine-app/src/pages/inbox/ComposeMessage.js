import React from 'react'
import "./inbox.css";

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

class ComposeMessage extends React.Component {
    render() {
        return (


            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            {/* <AccordionCustom />  */}
                            <h1>Hi</h1>
                            {/* <Accordion /> */}

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            // comment for pushing



        )

        
    }
}

export default ComposeMessage;