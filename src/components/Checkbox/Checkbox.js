import React from 'react'

function Checkbox() {
    return (
        <div className="styled-checkbox">
            <input
                className="styled-checkbox-input"
                id="styled-checkbox-1"
                type="checkbox"
                value="value1"
            />
            <label htmlFor="styled-checkbox-1"></label>
        </div>
    )
}

export default Checkbox
