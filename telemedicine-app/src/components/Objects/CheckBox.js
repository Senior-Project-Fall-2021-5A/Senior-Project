import { propTypes } from 'prop-types'

const CheckBox = ({ label, value, onChange }) => {
    
    return (
        <label style={{ color:'black', display: 'flex', flexDirection: 'column' }}>
            <input  type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    )
}

CheckBox.defaultProps = {

}

CheckBox.propTypes = {
    
}

export default CheckBox
