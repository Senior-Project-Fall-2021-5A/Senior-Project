import React from 'react'
import PropTypes from 'prop-types'

import './adminSchTimes.css'
import ObjCheckBox from '../../../components/Objects/ObjCheckBox'

const styleTD = {
    paddingTop: '0px',
    paddingBottom: '0px',
    
}
const styleTDBox = {
    paddingTop: '5px',
    paddingBottom: '0px',
    
}

const AdminSchTimes = ({}) => {
    const [checkedTime01, setCheckedTime01] = React.useState(false);

    const data = [
        {name: "time01", value: {checkedTime01}, text: "09:00 am"},
        {name: "time02", value: {checkedTime01}, text: "09:30 am"},
        {name: "time03", value: {checkedTime01}, text: "10:00 am"},
        {name: "time04", value: {checkedTime01}, text: "10:30 am"},
        {name: "time05", value: {checkedTime01}, text: "11:00 am"},
        {name: "time06", value: {checkedTime01}, text: "11:30 am"},
        {name: "time07", value: {checkedTime01}, text: "12:00 am"},
        {name: "time08", value: {checkedTime01}, text: "12:30 am"},
        {name: "time09", value: {checkedTime01}, text: "01:00 am"},
        {name: "time10", value: {checkedTime01}, text: "01:30 am"},
        {name: "time11", value: {checkedTime01}, text: "02:00 am"},
        {name: "time12", value: {checkedTime01}, text: "02:30 am"},
        {name: "time13", value: {checkedTime01}, text: "03:00 am"},
        {name: "time14", value: {checkedTime01}, text: "03:30 am"},
        {name: "time15", value: {checkedTime01}, text: "04:00 am"},
        {name: "time16", value: {checkedTime01}, text: "04:30 am"},
        
    ]

    const handleBoxTimeChange = (event) => {
        console.log("event:",event);
        console.log("name:",event.target.name);
        console.log("label:",event.target.parentNode.control.attributes.label.nodeValue);
    }
    
    return (
        <div className='adminschtimes-container'>
            <table id="timesSch" class='table'>
                <tbody>
                    {data.map(({boxName, boxValue, text}) =>(
                        <tr>
                            <td style={styleTDBox}>
                                <ObjCheckBox
                                    label=""
                                    name={boxName}
                                    value={boxValue}
                                    onChange={e => handleBoxTimeChange(e)}
                                />
                            </td>                        
                            <td style={styleTD}>{text}</td>                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

AdminSchTimes.propTypes = {

}

export default AdminSchTimes
