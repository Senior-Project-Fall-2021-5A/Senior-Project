import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ReportsWidget.css'

function ReportsWidget() {
    return (
            <Card className="Report-Widget-Container">
                <Card.Header className='Report-header'>
                    <h4 className='Report-widget-header'>
                        Most Recent Visit
                    </h4>
                </Card.Header>
                <Card.Body>
                    <div className= "report-card-content">
                    <Card.Title>
                        Urgent Care Visit
                    </Card.Title>
                    <Card.Text>
                        Breif Description of Last Visit
                    </Card.Text>
                    <Link to='/reportDisplay'>
                    <Button variant="primary">
                        Open Full Report
                    </Button>
                    </Link>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">1 day(s) ago</Card.Footer>
            </Card>
    )
}

export default ReportsWidget
