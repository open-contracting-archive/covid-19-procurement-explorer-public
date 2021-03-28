import React from 'react'

function Checkbox(props) {
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

export default Checkbox
