import React from 'react'
import "./inbox.css";

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ComposeMessage extends React.Component {
    render() {
        return (


            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            {/* <AccordionCustom />  */}
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control as="textarea" rows={1} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button variant="primary">Send</Button>{' '}
                            </Form>
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