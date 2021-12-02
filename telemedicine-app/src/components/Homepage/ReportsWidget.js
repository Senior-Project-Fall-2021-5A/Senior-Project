import {React, useState,useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ReportsWidget.css'
import  Axios  from 'axios'
import ObjLink from '../../components/Objects/ObjLink';

const ReportsWidget = () => {

    const [lastReport, setlastReport] = useState([]);

    useEffect(() => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/reports/getReports')
            .then((response) => {
                console.log("last report:",response);
                const mylastReport = response.data;
                setlastReport(response.data);
            })
            .catch((err) => {
                console.log(err, "Unable to get Reports");
            });
    }, []);

    

    return (
            <Card className="Report-Widget-Container">
                {lastReport.map((report) => (
                    <><Card.Header className='Report-header'>
                        <h4 className='Report-widget-header' key={report._id}>
                            {report.details}
                        </h4>
                    </Card.Header><Card.Body>
                            <div className="report-card-content">
                                <Card.Title>
                                    {report.doctor}
                                </Card.Title>
                                <Card.Text>
                                    {report.date}
                                </Card.Text>
                                <Link to='/reportDisplay'>
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
                ))}
            </Card>
    )
}


export default ReportsWidget
