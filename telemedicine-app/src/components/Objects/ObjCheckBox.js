import propTypes from 'prop-types'

const ObjCheckBox = ({ name, label, value, onChange, onCheck }) => {
    


    return (
        <label style={{ color:'black', display: 'flex', flexDirection: 'column' }}>
            <input 
                name={name} 
                label={label} 
                type="checkbox" 
                checked={value} 
                onChange={onChange} 
                onCheck={onCheck}
            />
            {label}
        </label>
    )
}

ObjCheckBox.defaultProps = {
    
}

ObjCheckBox.propTypes = {
    
}

export default ObjCheckBox
