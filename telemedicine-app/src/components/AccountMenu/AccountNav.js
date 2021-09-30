import React from 'react'
import './AccountNav.css'
import {Tab, Row, Col, Nav} from 'react-bootstrap'


function AccountNav() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row style={{width:'100%', marginLeft:'0px', marginRight:'0px', height:'100%'}}>
    <Col sm={3}>
      <Nav variant="pills" style={{width:'100%'}} className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">General Information</Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link href='/'>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          This is where the user will be able to view their name, user name, current password, doctor, and change attributes of their profile.
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          Hola Steven
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    )
}

export default AccountNav
