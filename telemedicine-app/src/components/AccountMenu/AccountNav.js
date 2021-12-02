import React from 'react'
import './AccountNav.css'
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import GeneralInfo from './GeneralInfo'
import InsuranceInfo from './InsuranceInfo'


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
          <Nav.Link eventKey="second">Insurance</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href='/'>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <h3 className='info-header'>Please use the inputs below to see and change your account information.</h3>
          <GeneralInfo/>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <h3 className='info-header'>Your Insurance Information Can Be Found Below</h3>
          <InsuranceInfo/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    )
}

export default AccountNav