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
    const [checkedTime02, setCheckedTime02] = React.useState(false);
    const [checkedTime03, setCheckedTime03] = React.useState(false);
    const [checkedTime04, setCheckedTime04] = React.useState(false);
    const [checkedTime05, setCheckedTime05] = React.useState(false);
    const [checkedTime06, setCheckedTime06] = React.useState(false);
    const [checkedTime07, setCheckedTime07] = React.useState(false);
    const [checkedTime08, setCheckedTime08] = React.useState(false);
    const [checkedTime09, setCheckedTime09] = React.useState(false);
    const [checkedTime10, setCheckedTime10] = React.useState(false);
    const [checkedTime11, setCheckedTime11] = React.useState(false);
    const [checkedTime12, setCheckedTime12] = React.useState(false);
    const [checkedTime13, setCheckedTime13] = React.useState(false);
    const [checkedTime14, setCheckedTime14] = React.useState(false);
    const [checkedTime15, setCheckedTime15] = React.useState(false);
    const [checkedTime16, setCheckedTime16] = React.useState(false);

    const data = [
        {name: "time01", value: {checkedTime01}, text: "09:00 am"},
        {name: "time02", value: {checkedTime02}, text: "09:30 am"},
        {name: "time03", value: {checkedTime03}, text: "10:00 am"},
        {name: "time04", value: {checkedTime04}, text: "10:30 am"},
        {name: "time05", value: {checkedTime05}, text: "11:00 am"},
        {name: "time06", value: {checkedTime06}, text: "11:30 am"},
        {name: "time07", value: {checkedTime07}, text: "12:00 am"},
        {name: "time08", value: {checkedTime08}, text: "12:30 am"},
        {name: "time09", value: {checkedTime09}, text: "01:00 am"},
        {name: "time10", value: {checkedTime10}, text: "01:30 am"},
        {name: "time11", value: {checkedTime11}, text: "02:00 am"},
        {name: "time12", value: {checkedTime12}, text: "02:30 am"},
        {name: "time13", value: {checkedTime13}, text: "03:00 am"},
        {name: "time14", value: {checkedTime14}, text: "03:30 am"},
        {name: "time15", value: {checkedTime15}, text: "04:00 am"},
        {name: "time16", value: {checkedTime16}, text: "04:30 am"},
        
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
