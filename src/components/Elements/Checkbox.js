import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = (props) => {
    return (
        <div className="styled-checkbox">
            <input
                className="styled-checkbox-input"
                id={props.id}
                type="checkbox"
                value={props.value}
                checked={props.checked}
                onChange={(e) => {
                    props.itemSelected(e.target.value)
                }}
            />
            <label htmlFor={props.id} />
        </div>
    )
}

Checkbox.propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    itemSelected: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Checkbox
