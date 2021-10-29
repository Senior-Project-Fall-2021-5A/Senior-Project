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
        {boxName: "time01", boxValue: checkedTime01, text: "09:00 am"},
        {boxName: "time02", boxValue: checkedTime02, text: "09:30 am"},
        {boxName: "time03", boxValue: checkedTime03, text: "10:00 am"},
        {boxName: "time04", boxValue: checkedTime04, text: "10:30 am"},
        {boxName: "time05", boxValue: checkedTime05, text: "11:00 am"},
        {boxName: "time06", boxValue: checkedTime06, text: "11:30 am"},
        {boxName: "time07", boxValue: checkedTime07, text: "12:00 am"},
        {boxName: "time08", boxValue: checkedTime08, text: "12:30 am"},
        {boxName: "time09", boxValue: checkedTime09, text: "01:00 am"},
        {boxName: "time10", boxValue: checkedTime10, text: "01:30 am"},
        {boxName: "time11", boxValue: checkedTime11, text: "02:00 am"},
        {boxName: "time12", boxValue: checkedTime12, text: "02:30 am"},
        {boxName: "time13", boxValue: checkedTime13, text: "03:00 am"},
        {boxName: "time14", boxValue: checkedTime14, text: "03:30 am"},
        {boxName: "time15", boxValue: checkedTime15, text: "04:00 am"},
        {boxName: "time16", boxValue: checkedTime16, text: "04:30 am"},
        
    ]

    const handleBoxTimeChange = (event) => {
        console.log("event:",event);
        console.log("name:",event.target.name);
        console.log("label:",event.target.parentNode.control.attributes.label.nodeValue);

        let boxName = event.target.name;
        if (boxName == "time01"){
            setCheckedTime01(!checkedTime01);
        } else if (boxName == "time02"){
            setCheckedTime02(!checkedTime02);
        } else if (boxName == "time03"){
            setCheckedTime03(!checkedTime03);
        } else if (boxName == "time04"){
            setCheckedTime04(!checkedTime04);
        } else if (boxName == "time05"){
            setCheckedTime05(!checkedTime05);
        } else if (boxName == "time06"){
            setCheckedTime06(!checkedTime06);
        } else if (boxName == "time07"){
            setCheckedTime07(!checkedTime07);
        } else if (boxName == "time08"){
            setCheckedTime08(!checkedTime08);
        } else if (boxName == "time09"){
            setCheckedTime09(!checkedTime09);
        } else if (boxName == "time10"){
            setCheckedTime10(!checkedTime10);
        } else if (boxName == "time11"){
            setCheckedTime11(!checkedTime11);
        } else if (boxName == "time12"){
            setCheckedTime12(!checkedTime12);
        } else if (boxName == "time13"){
            setCheckedTime13(!checkedTime13);
        } else if (boxName == "time14"){
            setCheckedTime14(!checkedTime14);
        } else if (boxName == "time15"){
            setCheckedTime15(!checkedTime15);
        } else if (boxName == "time16"){
            setCheckedTime16(!checkedTime16);
        }
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
