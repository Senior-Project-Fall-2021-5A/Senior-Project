import {React, useState,useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ReportsWidget.css'
import  Axios  from 'axios'
import ObjLink from '../../components/Objects/ObjLink';
import authUserObject from '../../middleware/authUserObject';

const ReportsWidget = () => {

    const [lastReport, setlastReport] = useState([]);

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/reports/getReports/${authUserObject.userId}`)
            .then((response) => {
                console.log("last report:",response);
                let arrdata = response.data.reverse();

                console.log(arrdata[0])
                setlastReport([response.data[0]]);
            })
            .catch((err) => {
                console.log(err, "Unable to get Reports");
            });
    }, []);

    

    return (
            <Card className="Report-Widget-Container">
                <Card.Header >
                        <h4 className='Report-widget-header'>
                            Reports
                        </h4>
                    </Card.Header>
                {lastReport.length === 0 ? lastReport.map((report) => (
                    <><Card.Header className='Report-header'>
                        <h4 className='Report-widget-header' key={report._id, report.doctor}>
                            {report.details}
                        </h4>
                    </Card.Header><Card.Body className="report-widget-body">
                            <div className="report-card-content">
                                <Card.Title>
                                    Doctor: {report.doctor}
                                </Card.Title>
                                <Card.Title>
                                    Date: {report.date}
                                </Card.Title>
                                <Link style={{textAlignLast: "center"}} to='/reportDisplay'>
                                <ObjLink
                                    className="view-report-widget-btn"
                                    linkInfo = '/reportDisplay'
                                    text = "View"
                                    doLink = "true"
                                    btnWidth = "100px"
                                    data = {{
                                        doctor: report.doctor, 
                                        _id: report._id,
                                    }}
                                />
                                </Link>
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-muted">1 day(s) ago</Card.Footer></>
                )) : <><Card.Header className='Report-header'>
                            <h4 className='Report-widget-header' key={'Empty Key'}>
                                {'No reports!'}
                            </h4>
                                </Card.Header><Card.Body className="report-widget-body">
                            </Card.Body>
                        <Card.Footer className="text-muted">1 day(s) ago</Card.Footer></>} 
            </Card>
    )
}


export default ReportsWidget
